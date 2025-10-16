'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem('cookie-consent', 'accepted')
    setIsVisible(false)
  }

  function handleDecline() {
    localStorage.setItem('cookie-consent', 'declined')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Cookie Notice</h3>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By clicking "Accept", you consent to our use of cookies.{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Learn more
              </a>
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleAccept}
                className="bg-primary hover:bg-primary/90"
              >
                Accept
              </Button>
              <Button onClick={handleDecline} variant="outline">
                Decline
              </Button>
            </div>
          </div>
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </Card>
    </div>
  )
}
