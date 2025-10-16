import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface TestResultEmailProps {
  fullName: string
  cefrLevel: CEFRLevel
  score: number
  percentage: number
  levelDescription: string
  pricingUrl: string
}

const cefrColorMap: Record<CEFRLevel, string> = {
  A1: '#10B981', // green
  A2: '#3B82F6', // blue
  B1: '#EAB308', // yellow
  B2: '#F97316', // orange
  C1: '#A855F7', // purple
  C2: '#EF4444', // red
}

export function renderTestResultEmail(props: TestResultEmailProps): string {
  const badgeColor = cefrColorMap[props.cefrLevel]

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #f8f9fa;">
        <div style="background: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background: linear-gradient(135deg, #E63946 0%, #FFB6B6 100%); color: white; padding: 40px 20px; text-align: center;">
            <div style="width: 60px; height: 60px; background: white; border-radius: 50%; display: inline-flex; align-items: center; justify-center; margin-bottom: 20px;">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 32px;">Test Complete!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Your placement test results are ready</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; margin-top: 0;">Hi ${props.fullName},</p>

            <p>Congratulations on completing your English placement test! We've analyzed your answers and calculated your CEFR level.</p>

            <!-- Results Box -->
            <div style="background: #f8f9fa; border-radius: 8px; padding: 30px; text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background: ${badgeColor}; color: white; padding: 12px 24px; border-radius: 24px; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
                ${props.cefrLevel}
              </div>

              <div style="display: flex; justify-content: center; gap: 40px; margin-top: 20px;">
                <div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Your Score</div>
                  <div style="font-size: 36px; font-weight: bold; color: #E63946;">${props.score}/25</div>
                </div>
                <div>
                  <div style="font-size: 14px; color: #666; margin-bottom: 8px;">Percentage</div>
                  <div style="font-size: 36px; font-weight: bold; color: #E63946;">${Math.round(props.percentage)}%</div>
                </div>
              </div>
            </div>

            <!-- Level Description -->
            <div style="background: #E6F7FF; border-left: 4px solid #3B82F6; padding: 20px; margin: 20px 0; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #1E40AF;">What This Means</h3>
              <p style="margin: 0; color: #334155; line-height: 1.6;">${props.levelDescription}</p>
            </div>

            <!-- Next Steps -->
            <h3>Ready to Start Learning?</h3>
            <p>Now that you know your level, it's time to choose the perfect course for your goals:</p>

            <ul style="padding-left: 20px; line-height: 1.8;">
              <li><strong>Starter Plan</strong> - 1 class per week, perfect for beginners</li>
              <li><strong>Standard Plan</strong> - 2 classes per week for steady progress</li>
              <li><strong>Intensive Plan</strong> - 3 classes per week for rapid improvement</li>
              <li><strong>Private 1:1</strong> - Personalized sessions with dedicated instructor</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${props.pricingUrl}" style="display: inline-block; background: #E63946; color: white; padding: 16px 40px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                View Pricing Plans
              </a>
            </div>

            <div style="background: #FFF7ED; border-left: 4px solid #F97316; padding: 15px; margin: 30px 0; border-radius: 4px;">
              <p style="margin: 0; font-size: 14px; color: #7C2D12;">
                <strong>Note:</strong> You can retake the placement test after 7 days if you'd like to reassess your level.
              </p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e5e5e5;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #666;">
              Questions? Contact us at
              <a href="mailto:support@l2plusenglish.com" style="color: #E63946; text-decoration: none;">
                support@l2plusenglish.com
              </a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #999;">
              © ${new Date().getFullYear()} L2+ English. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}
