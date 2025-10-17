'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Question {
  id: number
  question: string
  options: string[]
}

interface TestData {
  testId: string
  questions: Question[]
}

const QUESTIONS_PER_PAGE = 5
const TOTAL_PAGES = 5

export default function TestStartPage() {
  const router = useRouter()
  const [testData, setTestData] = useState<TestData | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    startTest()
  }, [])

  async function startTest() {
    try {
      const response = await fetch('/api/test/start', {
        method: 'POST',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to start test')
      }

      const data = await response.json()
      setTestData(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load test. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function handleAnswerSelect(questionId: number, answer: string) {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  function getCurrentPageQuestions(): Question[] {
    if (!testData) return []

    const startIdx = (currentPage - 1) * QUESTIONS_PER_PAGE
    const endIdx = startIdx + QUESTIONS_PER_PAGE
    return testData.questions.slice(startIdx, endIdx)
  }

  function isCurrentPageComplete(): boolean {
    const pageQuestions = getCurrentPageQuestions()
    return pageQuestions.every(q => answers[q.id] !== undefined)
  }

  function areAllQuestionsAnswered(): boolean {
    if (!testData) return false
    return testData.questions.every(q => answers[q.id] !== undefined)
  }

  function handleNextPage() {
    if (currentPage < TOTAL_PAGES && isCurrentPageComplete()) {
      setCurrentPage(prev => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  async function handleSubmit() {
    if (!testData || !areAllQuestionsAnswered()) return

    setSubmitting(true)
    setError(null)

    try {
      // Format answers for API
      const formattedAnswers = testData.questions.map(q => ({
        questionId: q.id,
        selectedAnswer: answers[q.id]
      }))

      const response = await fetch('/api/test/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testId: testData.testId,
          answers: formattedAnswers
        })
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit test')
      }

      const result = await response.json()

      // Redirect to results page with result data
      router.push(`/test/results?id=${result.id}`)
    } catch (err: any) {
      setError(err.message || 'Failed to submit test. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading test...</p>
      </div>
    )
  }

  if (error && !testData) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/test')} className="mt-4">
          Go Back
        </Button>
      </div>
    )
  }

  const pageQuestions = getCurrentPageQuestions()
  const answeredCount = testData?.questions.filter(q => answers[q.id] !== undefined).length || 0
  const totalQuestions = testData?.questions.length || 25

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Placement Test
          </h1>
          <div className="text-sm text-gray-600">
            Page {currentPage} of {TOTAL_PAGES}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 text-center">
          {answeredCount} of {totalQuestions} questions answered
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-8 mb-8">
        {pageQuestions.map((question, idx) => {
          const questionNumber = (currentPage - 1) * QUESTIONS_PER_PAGE + idx + 1
          const isAnswered = answers[question.id] !== undefined

          return (
            <Card key={question.id} className={cn(
              'border-2',
              isAnswered ? 'border-green-200' : 'border-gray-200'
            )}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {isAnswered ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {questionNumber}. {question.question}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {question.options.map((option, optIdx) => {
                    const optionLetter = ['A', 'B', 'C', 'D'][optIdx]
                    const isSelected = answers[question.id] === optionLetter

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswerSelect(question.id, optionLetter)}
                        className={cn(
                          'w-full p-4 text-left rounded-lg border-2 transition-all',
                          isSelected
                            ? 'border-primary bg-primary/5 font-medium'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        )}
                      >
                        <span className="font-semibold mr-2">{optionLetter})</span>
                        {option}
                      </button>
                    )}
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Navigation */}
      <Card>
        <CardFooter className="p-6">
          <div className="w-full flex flex-col gap-4">
            {/* Page Indicators */}
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-2 w-12 rounded-full transition-colors',
                    idx + 1 < currentPage ? 'bg-green-500' :
                    idx + 1 === currentPage ? 'bg-primary' :
                    'bg-gray-200'
                  )}
                />
              ))}
            </div>

            {/* Action Button */}
            {currentPage < TOTAL_PAGES ? (
              <Button
                onClick={handleNextPage}
                disabled={!isCurrentPageComplete()}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                Next Page →
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!areAllQuestionsAnswered() || submitting}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                {submitting ? 'Submitting...' : 'Submit Test'}
              </Button>
            )}

            {!isCurrentPageComplete() && currentPage < TOTAL_PAGES && (
              <p className="text-sm text-center text-gray-600">
                Please answer all questions on this page to continue
              </p>
            )}

            {currentPage === TOTAL_PAGES && !areAllQuestionsAnswered() && (
              <p className="text-sm text-center text-gray-600">
                Please answer all {totalQuestions} questions to submit the test
              </p>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Note: No back navigation (forward-only per spec) */}
      <p className="text-xs text-center text-gray-500 mt-4">
        Note: You cannot go back to previous pages. Please review your answers carefully before proceeding.
      </p>
    </div>
  )
}
