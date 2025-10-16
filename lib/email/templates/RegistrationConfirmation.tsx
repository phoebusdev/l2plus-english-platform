import * as React from 'react'

interface RegistrationConfirmationEmailProps {
  fullName: string
  testUrl: string
}

export function RegistrationConfirmationEmail({
  fullName,
  testUrl
}: RegistrationConfirmationEmailProps) {
  return (
    <html>
      <head>
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #E63946 0%, #FFB6B6 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #ffffff;
            padding: 40px 30px;
            border: 1px solid #e5e5e5;
          }
          .button {
            display: inline-block;
            background: #E63946;
            color: white;
            padding: 14px 32px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e5e5e5;
          }
          .steps {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
          }
          .step {
            margin: 15px 0;
            padding-left: 30px;
            position: relative;
          }
          .step-number {
            position: absolute;
            left: 0;
            top: 0;
            background: #E63946;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-center;
            font-weight: bold;
            font-size: 12px;
          }
        `}</style>
      </head>
      <body>
        <div className="header">
          <h1 style={{ margin: 0, fontSize: '32px' }}>Welcome to L2+ English!</h1>
        </div>

        <div className="content">
          <p style={{ fontSize: '18px' }}>Hi {fullName},</p>

          <p>
            Thank you for registering with L2+ English! We're excited to help you on your journey to mastering English.
          </p>

          <p>
            Your account has been successfully created. The next step is to take our free placement test to determine your current CEFR level.
          </p>

          <div className="steps">
            <h3 style={{ marginTop: 0 }}>What's Next?</h3>

            <div className="step">
              <div className="step-number">1</div>
              <strong>Take the Placement Test</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                25 questions to assess your English level (no time limit)
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <strong>Get Your CEFR Level</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                Instant results from A1 (Beginner) to C2 (Proficient)
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <strong>Choose Your Plan</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                Select the course that fits your schedule and goals
              </p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <strong>Start Learning</strong>
              <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>
                Join live Zoom classes with expert instructors
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '30px 0' }}>
            <a href={testUrl} className="button">
              Take Free Placement Test
            </a>
          </div>

          <p style={{ fontSize: '14px', color: '#666', marginTop: '30px' }}>
            Questions? Our support team is here to help at{' '}
            <a href="mailto:support@l2plusenglish.com" style={{ color: '#E63946' }}>
              support@l2plusenglish.com
            </a>
          </p>
        </div>

        <div className="footer">
          <p>© {new Date().getFullYear()} L2+ English. All rights reserved.</p>
          <p>
            <a href={`${testUrl.split('/test')[0]}/privacy`} style={{ color: '#666', marginRight: '15px' }}>
              Privacy Policy
            </a>
            <a href={`${testUrl.split('/test')[0]}/terms`} style={{ color: '#666' }}>
              Terms of Service
            </a>
          </p>
        </div>
      </body>
    </html>
  )
}

// Helper function to render email to HTML string
export function renderRegistrationConfirmationEmail(props: RegistrationConfirmationEmailProps): string {
  const element = React.createElement(RegistrationConfirmationEmail, props)
  // In production, use a proper React email renderer
  // For now, return a simple HTML string
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0;">
        <div style="background: linear-gradient(135deg, #E63946 0%, #FFB6B6 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 32px;">Welcome to L2+ English!</h1>
        </div>

        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5;">
          <p style="font-size: 18px;">Hi ${props.fullName},</p>

          <p>Thank you for registering with L2+ English! We're excited to help you on your journey to mastering English.</p>

          <p>Your account has been successfully created. The next step is to take our free placement test to determine your current CEFR level.</p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What's Next?</h3>
            <ol style="padding-left: 20px;">
              <li style="margin: 10px 0;"><strong>Take the Placement Test</strong> - 25 questions to assess your English level</li>
              <li style="margin: 10px 0;"><strong>Get Your CEFR Level</strong> - Instant results from A1 to C2</li>
              <li style="margin: 10px 0;"><strong>Choose Your Plan</strong> - Select the course that fits your goals</li>
              <li style="margin: 10px 0;"><strong>Start Learning</strong> - Join live Zoom classes with expert instructors</li>
            </ol>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${props.testUrl}" style="display: inline-block; background: #E63946; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              Take Free Placement Test
            </a>
          </div>
        </div>

        <div style="text-align: center; padding: 20px; color: #666; font-size: 14px; border-top: 1px solid #e5e5e5;">
          <p>© ${new Date().getFullYear()} L2+ English. All rights reserved.</p>
        </div>
      </body>
    </html>
  `
}
