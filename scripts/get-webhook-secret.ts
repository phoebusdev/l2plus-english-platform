import Stripe from 'stripe'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

async function getWebhookSecret() {
  try {
    const webhookUrl = 'https://l2plus-english.vercel.app/api/webhooks/stripe'

    console.log('🔍 Finding webhook endpoint...\n')

    // List existing webhooks
    const webhooks = await stripe.webhookEndpoints.list()
    const webhook = webhooks.data.find(wh => wh.url === webhookUrl)

    if (!webhook) {
      console.error('❌ Webhook endpoint not found!')
      console.log('Run: npm run setup-webhook')
      return
    }

    console.log(`Found webhook: ${webhook.id}`)
    console.log(`URL: ${webhook.url}\n`)

    // Note: The API doesn't return the secret for security reasons
    // We need to roll (rotate) the secret to get a new one
    console.log('🔄 Rolling webhook secret to generate a new one...\n')

    const updatedWebhook = await stripe.webhookEndpoints.update(webhook.id, {
      // Rolling the secret by updating metadata triggers a new secret
      // We'll use a small update to force a secret rotation
    })

    // Unfortunately, even after update, the API doesn't return the secret
    // The only way is via the dashboard or Stripe CLI listen mode

    console.log('⚠️  The webhook secret cannot be retrieved via API for security reasons.\n')
    console.log('Use ONE of these methods:\n')

    console.log('METHOD 1: Stripe Dashboard (Easiest)')
    console.log('1. Go to: https://dashboard.stripe.com/test/webhooks')
    console.log(`2. Click on webhook: ${webhook.id}`)
    console.log('3. Click "Reveal" next to "Signing secret"')
    console.log('4. Copy the secret (starts with whsec_...)\n')

    console.log('METHOD 2: Stripe CLI')
    console.log('1. Run: stripe login')
    console.log('2. Run: stripe listen --forward-to https://l2plus-english.vercel.app/api/webhooks/stripe')
    console.log('3. Copy the webhook signing secret from the output\n')

    console.log('Then add to Vercel:')
    console.log('  vercel env add STRIPE_WEBHOOK_SECRET')
    console.log('  (Paste the secret when prompted)')
    console.log('  (Select: Production, Preview, Development)')

  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

getWebhookSecret()
