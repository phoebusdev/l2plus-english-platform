import { Resend } from 'resend'
import { db } from '@/lib/db'
import { emailLog } from '@/lib/db/schema'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export type EmailType =
  | 'registration_confirmation'
  | 'test_result'
  | 'class_reminder_24h'
  | 'payment_success'
  | 'payment_failed'
  | 'subscription_cancelled'
  | 'password_reset'
  | 'kondesk_registration'

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  emailType: EmailType
  metadata?: Record<string, any>
}

/**
 * Send an email using Resend and log the result
 */
export async function sendEmail({
  to,
  subject,
  html,
  emailType,
  metadata
}: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'L2+ English <noreply@l2plusenglish.com>',
      to,
      subject,
      html,
    })

    if (error) {
      // Log failure
      await db.insert(emailLog).values({
        recipient: to,
        emailType: emailType as any,
        subject,
        status: 'failed',
        errorMessage: error.message,
        metadata,
      })

      console.error('Email send failed:', error)
      return { success: false, error: error.message }
    }

    // Log success
    await db.insert(emailLog).values({
      recipient: to,
      emailType: emailType as any,
      subject,
      status: 'sent',
      resendMessageId: data?.id,
      metadata,
    })

    return { success: true, messageId: data?.id }
  } catch (error: any) {
    // Log exception
    try {
      await db.insert(emailLog).values({
        recipient: to,
        emailType: emailType as any,
        subject,
        status: 'failed',
        errorMessage: error.message || 'Unknown error',
        metadata,
      })
    } catch (dbError) {
      console.error('Failed to log email error:', dbError)
    }

    console.error('Email send exception:', error)
    return { success: false, error: error.message || 'Unknown error' }
  }
}
