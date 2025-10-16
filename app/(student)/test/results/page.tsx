'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import { getCEFRDescription } from '@/lib/constants/cefr-colors'
import { AlertCircle, CheckCircle2, Mail, TrendingUp } from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface TestResult {
  id: string
  score: number
  percentage: number
  assignedLevel: CEFRLevel
  completedAt: string
}

function TestResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const resultId = searchParams.get('id')

  const [result, setResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (resultId) {
      fetchResult(resultId)
    } else {
      setError('No test result ID provided')
      setLoading(false)
    }
  }, [resultId])

  async function fetchResult(id: string) {
    try {
      const response = await fetch(`/api/test/results/${id}`)

      if (!response.ok) {
        throw new Error('Failed to load test results')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError('Failed to load test results. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading results...</p>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'No results found'}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/dashboard')} className="mt-4">
          Go to Dashboard
        </Button>
      </div>
    )
  }

  const levelDescription = getCEFRDescription(result.assignedLevel)

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Congratulations Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
          Test Complete!
        </h1>
        <p className="text-lg text-gray-600">
          Congratulations on completing your English placement test
        </p>
      </div>

      {/* Main Results Card */}
      <Card className="mb-8 border-2 border-primary">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl mb-4">Your Results</CardTitle>
          <div className="flex justify-center">
            <CEFRBadge level={result.assignedLevel} size="lg" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Your Score</p>
              <p className="text-4xl font-bold text-primary">
                {result.score}/25
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Percentage</p>
              <p className="text-4xl font-bold text-primary">
                {result.percentage.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Level Description */}
          <div className="p-6 bg-primary/5 rounded-lg">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              What This Means
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {levelDescription}
            </p>
          </div>

          {/* Email Notification */}
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              A detailed copy of your results has been sent to your registered email address.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-1">View Course Options</h4>
                <p className="text-sm text-gray-600">
                  Explore our pricing plans to find the perfect course for your learning goals
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-1">Select Your Plan</h4>
                <p className="text-sm text-gray-600">
                  Choose from Starter, Standard, Intensive, or Private 1:1 sessions
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-1">Start Learning</h4>
                <p className="text-sm text-gray-600">
                  Join live Zoom classes matched to your CEFR level and start improving today
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => router.push('/pricing')}
          className="flex-1 bg-primary hover:bg-primary/90"
          size="lg"
        >
          View Pricing Plans
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outline"
          className="flex-1"
          size="lg"
        >
          Go to Dashboard
        </Button>
      </div>

      {/* Retake Information */}
      <p className="text-sm text-center text-gray-500 mt-8">
        You can retake the placement test after 7 days if you'd like to reassess your level.
      </p>
    </div>
  )
}

export default function TestResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading results...</p>
      </div>
    }>
      <TestResultsContent />
    </Suspense>
  )
}
