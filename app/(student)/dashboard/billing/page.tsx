'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Loader2,
} from 'lucide-react'

interface PaymentInfo {
  status: string
  stripeCustomerId: string | null
  currentPeriodEnd: string | null
  gracePeriodEndsAt: string | null
  cancelAtPeriodEnd: boolean
  planName: string | null
  priceInCents: number | null
}

export default function BillingPage() {
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    fetchPaymentInfo()
  }, [])

  async function fetchPaymentInfo() {
    try {
      const response = await fetch('/api/payment/status')

      if (!response.ok) {
        throw new Error('Failed to load payment information')
      }

      const data = await response.json()
      setPaymentInfo(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load payment information')
    } finally {
      setLoading(false)
    }
  }

  async function handleManageBilling() {
    setRedirecting(true)
    setError(null)

    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal')
      }

      // Redirect to Stripe Customer Portal
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message)
      setRedirecting(false)
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
            <CheckCircle2 className="h-4 w-4" />
            Active
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
            <XCircle className="h-4 w-4" />
            Payment Failed
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            <XCircle className="h-4 w-4" />
            Cancelled
          </span>
        )
      case 'none':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            <Clock className="h-4 w-4" />
            No Subscription
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
            {status}
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading billing information...</p>
      </div>
    )
  }

  if (error && !paymentInfo) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!paymentInfo) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
          Billing & Payment
        </h1>
        <p className="text-lg text-gray-600">
          Manage your subscription and payment methods
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Status Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Status</p>
              {getStatusBadge(paymentInfo.status)}
            </div>
            {paymentInfo.planName && (
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Plan</p>
                <p className="text-lg font-semibold">{paymentInfo.planName}</p>
                {paymentInfo.priceInCents && (
                  <p className="text-sm text-gray-600">
                    ${(paymentInfo.priceInCents / 100).toFixed(2)}/month
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Active Subscription */}
          {paymentInfo.status === 'active' && paymentInfo.currentPeriodEnd && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Next billing date:</strong>{' '}
                {new Date(paymentInfo.currentPeriodEnd).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              {paymentInfo.cancelAtPeriodEnd && (
                <p className="text-sm text-orange-600 mt-2">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Your subscription will end on this date
                </p>
              )}
            </div>
          )}

          {/* Failed Payment with Grace Period */}
          {paymentInfo.status === 'failed' && paymentInfo.gracePeriodEndsAt && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 mb-2">
                <strong>Payment failed.</strong> Please update your payment method to continue
                your subscription.
              </p>
              <p className="text-sm text-red-600">
                <Clock className="h-4 w-4 inline mr-1" />
                Grace period ends:{' '}
                {new Date(paymentInfo.gracePeriodEndsAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          )}

          {/* No Subscription */}
          {paymentInfo.status === 'none' && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-800 mb-3">
                You don't have an active subscription. Subscribe to a plan to access live classes.
              </p>
              <Button asChild>
                <a href="/pricing">View Pricing Plans</a>
              </Button>
            </div>
          )}

          {/* Cancelled Subscription */}
          {paymentInfo.status === 'cancelled' && (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-800 mb-3">
                Your subscription has been cancelled. Reactivate to continue accessing classes.
              </p>
              <Button asChild>
                <a href="/pricing">View Pricing Plans</a>
              </Button>
            </div>
          )}

          {/* Manage Billing Button */}
          {paymentInfo.stripeCustomerId && (
            <div className="pt-4 border-t">
              <Button
                onClick={handleManageBilling}
                disabled={redirecting}
                className="w-full md:w-auto"
                variant="outline"
              >
                {redirecting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Opening Billing Portal...
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Payment Method
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                You'll be redirected to our secure payment portal where you can update your
                payment method, view invoices, and manage your subscription.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact our support team if you have any billing questions.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href="/contact">Contact Support</a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Payment Security</h3>
            <p className="text-sm text-gray-600">
              All payments are processed securely through Stripe. We never store your card
              details.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
