'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import { Calendar, Clock, Users, ExternalLink, AlertCircle } from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface ClassSession {
  id: string
  dateTime: string
  cefrLevel: CEFRLevel
  zoomUrl: string
  capacity: number
  enrollmentCount: number
  instructorName: string | null
  isEnrolled: boolean
}

interface ClassesResponse {
  classes: ClassSession[]
  studentLevel: CEFRLevel
  paymentStatus: string
  message?: string
}

export default function ClassesPage() {
  const [data, setData] = useState<ClassesResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [enrolling, setEnrolling] = useState<string | null>(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  async function fetchClasses() {
    try {
      const response = await fetch('/api/classes')

      if (!response.ok) {
        throw new Error('Failed to load classes')
      }

      const data = await response.json()
      setData(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load classes')
    } finally {
      setLoading(false)
    }
  }

  async function handleJoinClass(classId: string) {
    setEnrolling(classId)
    setError(null)

    try {
      const response = await fetch(`/api/classes/${classId}/join`, {
        method: 'POST',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join class')
      }

      // Open Zoom URL in new tab
      window.open(result.zoomUrl, '_blank')

      // Refresh classes list
      fetchClasses()
    } catch (err: any) {
      setError(err.message || 'Failed to join class')
    } finally {
      setEnrolling(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading classes...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error || 'Failed to load classes'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
          My Classes
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-600">Your Level:</p>
          <CEFRBadge level={data.studentLevel} />
        </div>
      </div>

      {/* Payment Status Alert */}
      {data.paymentStatus !== 'active' && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            An active subscription is required to join classes.{' '}
            <a href="/pricing" className="text-primary hover:underline font-medium">
              View pricing plans
            </a>
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Message (e.g., no placement test) */}
      {data.message && (
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{data.message}</AlertDescription>
        </Alert>
      )}

      {/* Classes List */}
      {data.classes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Classes Available</h3>
            <p className="text-gray-600">
              There are currently no upcoming classes for your level. Check back soon!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {data.classes.map((classSession) => {
            const classDate = new Date(classSession.dateTime)
            const formattedDate = classDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
            const formattedTime = classDate.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            })

            return (
              <Card key={classSession.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <CEFRBadge level={classSession.cefrLevel} size="sm" />
                        {classSession.isEnrolled && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Enrolled
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar className="h-4 w-4" />
                          <span>{formattedDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock className="h-4 w-4" />
                          <span>{formattedTime}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Users className="h-4 w-4" />
                          <span>
                            {classSession.enrollmentCount} / {classSession.capacity} students
                          </span>
                        </div>

                        {classSession.instructorName && (
                          <p className="text-sm text-gray-600">
                            Instructor: {classSession.instructorName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {classSession.isEnrolled ? (
                        <Button
                          onClick={() => window.open(classSession.zoomUrl, '_blank')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Join Class
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleJoinClass(classSession.id)}
                          disabled={
                            data.paymentStatus !== 'active' ||
                            enrolling === classSession.id
                          }
                          className="bg-primary hover:bg-primary/90"
                        >
                          {enrolling === classSession.id ? 'Enrolling...' : 'Enroll Now'}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
