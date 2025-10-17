'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { FileText, Clock, AlertCircle } from 'lucide-react'

interface EligibilityResponse {
  eligible: boolean
  reason?: string
  lastTestDate?: string
  nextAvailableDate?: string
}

export default function PlacementTestPage() {
  const router = useRouter()
  const [eligibility, setEligibility] = useState<EligibilityResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkEligibility()
  }, [])

  async function checkEligibility() {
    try {
      const response = await fetch('/api/test/eligibility')

      if (!response.ok) {
        throw new Error('Failed to check eligibility')
      }

      const data = await response.json()
      setEligibility(data)
    } catch (err) {
      setError('Failed to load test information. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleStartTest() {
    router.push('/test/start')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
          English Placement Test
        </h1>
        <p className="text-lg text-gray-600">
          Discover your CEFR level with our comprehensive assessment
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Test Format</h3>
                <p className="text-sm text-gray-600">
                  25 multiple-choice questions across 5 pages covering conversational English, grammar, and vocabulary
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">No Time Limit</h3>
                <p className="text-sm text-gray-600">
                  Take your time to answer each question carefully. There's no rush!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Instructions</CardTitle>
          <CardDescription>
            Please read carefully before starting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>The test consists of 25 questions divided into 5 pages (5 questions per page)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>You must answer all questions on each page before proceeding to the next</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>You cannot go back to previous pages once you move forward</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Your CEFR level (A1-C2) will be automatically calculated based on your score</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Results will be sent to your email and displayed immediately upon completion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold">•</span>
              <span>You can retake the test after 7 days if needed</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          {!eligibility?.eligible && eligibility?.nextAvailableDate && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {eligibility.reason} Next test available on{' '}
                {new Date(eligibility.nextAvailableDate).toLocaleDateString()}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleStartTest}
            disabled={!eligibility?.eligible}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            {eligibility?.eligible ? 'Start Test' : 'Test Not Available'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
