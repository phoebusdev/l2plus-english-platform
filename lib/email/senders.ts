import { sendEmail } from './index'
import { renderRegistrationConfirmationEmail } from './templates/RegistrationConfirmation'
import { renderTestResultEmail } from './templates/TestResult'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

/**
 * Send registration confirmation email
 */
export async function sendRegistrationEmail(
  email: string,
  fullName: string
): Promise<{ success: boolean; error?: string }> {
  const testUrl = `${process.env.NEXT_PUBLIC_APP_URL}/test`

  const html = renderRegistrationConfirmationEmail({
    fullName,
    testUrl,
  })

  return await sendEmail({
    to: email,
    subject: 'Welcome to L2+ English - Take Your Free Placement Test',
    html,
    emailType: 'registration_confirmation',
    metadata: {
      fullName,
    },
  })
}

/**
 * Send test result email
 */
export async function sendTestResultEmail(
  email: string,
  fullName: string,
  cefrLevel: CEFRLevel,
  score: number,
  percentage: number,
  levelDescription: string
): Promise<{ success: boolean; error?: string }> {
  const pricingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pricing`

  const html = renderTestResultEmail({
    fullName,
    cefrLevel,
    score,
    percentage,
    levelDescription,
    pricingUrl,
  })

  return await sendEmail({
    to: email,
    subject: `Your English Placement Test Results: ${cefrLevel}`,
    html,
    emailType: 'test_result',
    metadata: {
      fullName,
      cefrLevel,
      score,
      percentage,
    },
  })
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(
  email: string,
  fullName: string,
  resetUrl: string
): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 40px;">
          <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #333;">Reset Your Password</h1>

          <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Hi ${fullName},</p>

          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password for your L2+ English account. If you didn't make this request, you can safely ignore this email.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="display: inline-block; background: #E63946; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Reset Password
            </a>
          </div>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            This link will expire in 1 hour for security reasons. If you need a new link, please request another password reset.
          </p>

          <p style="color: #999; font-size: 14px; margin-top: 20px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #E63946; word-break: break-all;">${resetUrl}</a>
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} L2+ English. All rights reserved.</p>
        </div>
      </body>
    </html>
  `

  return await sendEmail({
    to: email,
    subject: 'Reset Your L2+ English Password',
    html,
    emailType: 'password_reset',
    metadata: {
      fullName,
    },
  })
}

/**
 * Send class reminder email (24 hours before class)
 */
export async function sendClassReminderEmail(
  email: string,
  fullName: string,
  className: string,
  classDateTime: Date,
  zoomUrl: string
): Promise<{ success: boolean; error?: string }> {
  const formattedDate = classDateTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = classDateTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #ffffff; border: 1px solid #e5e5e5; border-radius: 8px; padding: 40px;">
          <div style="background: #E6F7FF; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom: 10px;">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#3B82F6"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#3B82F6"/>
            </svg>
            <h1 style="margin: 0; font-size: 24px; color: #1E40AF;">Class Reminder</h1>
            <p style="margin: 10px 0 0 0; color: #3B82F6; font-size: 14px;">Your class starts in 24 hours</p>
          </div>

          <p style="font-size: 16px; color: #666;">Hi ${fullName},</p>

          <p style="color: #666; line-height: 1.6;">
            This is a friendly reminder that your English class is scheduled for tomorrow:
          </p>

          <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Class:</td>
                <td style="padding: 8px 0; color: #333;">${className}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Date:</td>
                <td style="padding: 8px 0; color: #333;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">Time:</td>
                <td style="padding: 8px 0; color: #333;">${formattedTime}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${zoomUrl}" style="display: inline-block; background: #E63946; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Join Zoom Class
            </a>
          </div>

          <p style="color: #999; font-size: 14px; margin-top: 30px;">
            <strong>Tip:</strong> Join a few minutes early to test your audio and video settings.
          </p>
        </div>

        <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
          <p>© ${new Date().getFullYear()} L2+ English. All rights reserved.</p>
        </div>
      </body>
    </html>
  `

  return await sendEmail({
    to: email,
    subject: `Reminder: ${className} - Tomorrow at ${formattedTime}`,
    html,
    emailType: 'class_reminder_24h',
    metadata: {
      fullName,
      className,
      classDateTime: classDateTime.toISOString(),
    },
  })
}
