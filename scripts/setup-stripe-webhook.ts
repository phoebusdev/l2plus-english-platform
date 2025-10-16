import Stripe from 'stripe'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
})

async function setupWebhook() {
  try {
    console.log('🔧 Setting up Stripe webhook endpoint...\n')

    const webhookUrl = 'https://l2plus-english.vercel.app/api/webhooks/stripe'

    // List existing webhooks to check if it already exists
    const existingWebhooks = await stripe.webhookEndpoints.list()
    const existing = existingWebhooks.data.find(wh => wh.url === webhookUrl)

    if (existing) {
      console.log('⚠️  Webhook endpoint already exists!')
      console.log(`   URL: ${existing.url}`)
      console.log(`   Status: ${existing.status}`)
      console.log(`   Events: ${existing.enabled_events.join(', ')}\n`)

      console.log('To get the webhook secret:')
      console.log('1. Go to: https://dashboard.stripe.com/test/webhooks')
      console.log('2. Click on the webhook endpoint')
      console.log('3. Click "Reveal" next to "Signing secret"')
      console.log('4. Copy the secret (starts with whsec_...)')
      console.log('5. Add it to Vercel: STRIPE_WEBHOOK_SECRET=whsec_...\n')
      return
    }

    // Create new webhook endpoint
    const webhook = await stripe.webhookEndpoints.create({
      url: webhookUrl,
      enabled_events: [
        'checkout.session.completed',
        'invoice.paid',
        'invoice.payment_failed',
        'customer.subscription.deleted',
      ],
      api_version: '2025-02-24.acacia',
    })

    console.log('✅ Webhook endpoint created successfully!\n')
    console.log(`📍 URL: ${webhook.url}`)
    console.log(`🔢 ID: ${webhook.id}`)
    console.log(`📋 Events:`)
    webhook.enabled_events.forEach(event => console.log(`   - ${event}`))
    console.log()

    console.log('⚠️  IMPORTANT: Webhook signing secret')
    console.log('The signing secret is only shown once when the webhook is created.')
    console.log('Since this was created via API, you need to retrieve it from the dashboard:')
    console.log()
    console.log('1. Go to: https://dashboard.stripe.com/test/webhooks')
    console.log(`2. Click on the webhook: ${webhook.id}`)
    console.log('3. Click "Reveal" next to "Signing secret"')
    console.log('4. Copy the secret (starts with whsec_...)')
    console.log()
    console.log('Then add it to Vercel environment variables:')
    console.log('  Name: STRIPE_WEBHOOK_SECRET')
    console.log('  Value: whsec_...')
    console.log('  Environments: Production, Preview, Development')
    console.log()

  } catch (error: any) {
    console.error('❌ Error setting up webhook:', error.message)

    if (error.code === 'resource_missing') {
      console.error('\nMake sure STRIPE_SECRET_KEY is set correctly in your .env.local file')
    }
  }
}

setupWebhook()
