import { sendEmail } from './index'

interface KondeskStudentData {
  fullName: string
  email: string
  phone?: string | null
  timezone?: string | null
  selfReportedLevel?: string | null
  registrationDate: Date
}

/**
 * Send student registration data to Kondesk CRM via email
 * This is a non-blocking operation - registration succeeds even if this fails
 */
export async function sendKondeskNotification(
  studentData: KondeskStudentData
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.KONDESK_EMAIL) {
      console.warn('KONDESK_EMAIL not configured, skipping Kondesk notification')
      return { success: false, error: 'Not configured' }
    }

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #E63946;">New Student Registration</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Full Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Timezone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.timezone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Self Reported Level:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.selfReportedLevel || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;">Registration Date:</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${studentData.registrationDate.toLocaleString()}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This is an automated notification from L2+ English platform.
          </p>
        </body>
      </html>
    `

    const result = await sendEmail({
      to: process.env.KONDESK_EMAIL,
      subject: `New Student Registration: ${studentData.fullName}`,
      html,
      emailType: 'admin_notification',
      metadata: {
        studentEmail: studentData.email,
        fullName: studentData.fullName,
      },
    })

    return result
  } catch (error: any) {
    console.error('Kondesk notification error:', error)
    return { success: false, error: error.message }
  }
}
