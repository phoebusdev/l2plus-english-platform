import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Calendar, BookOpen, Award, CreditCard } from 'lucide-react'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { students, testResults, classSessions, enrollments, users } from '@/lib/db/schema'
import { eq, gte, and, desc } from 'drizzle-orm'
import { getCEFRDescription } from '@/lib/utils/cefr'
import { formatGMTDate } from '@/lib/utils/date'

export default async function StudentDashboard() {
  const session = await auth()

  if (!session?.user) {
    return null // Layout handles redirect
  }

  // Fetch student data
  const [student] = await db
    .select()
    .from(students)
    .where(eq(students.id, session.user.id))
    .limit(1)

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1)

  if (!student || !user) {
    return (
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <Alert variant="destructive">
            <AlertDescription>
              Student profile not found. Please contact support.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  // Fetch test results
  const studentTestResults = await db
    .select()
    .from(testResults)
    .where(eq(testResults.studentId, session.user.id))
    .orderBy(desc(testResults.completedAt))
    .limit(5)

  const latestTest = studentTestResults[0] || null

  // Fetch upcoming classes for student's level
  const now = new Date()
  const upcomingClasses = await db
    .select({
      id: classSessions.id,
      dateTime: classSessions.dateTime,
      cefrLevel: classSessions.cefrLevel,
      zoomUrl: classSessions.zoomUrl,
      capacity: classSessions.capacity,
      enrollmentCount: classSessions.enrollmentCount,
      instructorName: classSessions.instructorName,
    })
    .from(classSessions)
    .where(
      and(
        eq(classSessions.cefrLevel, student.assignedCefrLevel || 'A1'),
        gte(classSessions.dateTime, now)
      )
    )
    .orderBy(classSessions.dateTime)
    .limit(3)

  // Check which classes student is enrolled in
  const studentEnrollments = await db
    .select({ classSessionId: enrollments.classSessionId })
    .from(enrollments)
    .where(eq(enrollments.studentId, session.user.id))

  const enrolledClassIds = new Set(studentEnrollments.map(e => e.classSessionId))

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.fullName.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">Here's your learning dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* CEFR Level */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {student.assignedCefrLevel || 'Not tested'}
              </div>
              <p className="text-xs text-muted-foreground">
                {student.assignedCefrLevel && getCEFRDescription(student.assignedCefrLevel)}
              </p>
            </CardContent>
          </Card>

          {/* Last Test Score */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test Score</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestTest ? `${latestTest.score}/20` : 'No tests'}
              </div>
              <p className="text-xs text-muted-foreground">
                {latestTest ? `${latestTest.percentage}% correct` : 'Take your first test'}
              </p>
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscription</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Badge
                  variant={
                    student.paymentStatus === 'active'
                      ? 'default'
                      : student.paymentStatus === 'none'
                        ? 'secondary'
                        : 'destructive'
                  }
                >
                  {student.paymentStatus}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {student.paymentStatus === 'active' && 'Full access to classes'}
                {student.paymentStatus === 'none' && 'No active subscription'}
                {student.paymentStatus === 'failed' && 'Payment failed'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* No Payment Alert */}
        {student.paymentStatus === 'none' && (
          <Alert className="mb-8">
            <AlertDescription>
              <strong>Choose a plan to start learning!</strong> Select from our flexible pricing options to
              join live classes.{' '}
              <Link href="/pricing" className="underline font-medium">
                View pricing plans →
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Payment Failed Alert */}
        {student.paymentStatus === 'failed' && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              <strong>Payment failed!</strong> Update your payment method to continue accessing classes.{' '}
              <Link href="/dashboard/billing" className="underline font-medium">
                Update payment →
              </Link>
            </AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Classes */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>
                      Your {student.assignedCefrLevel || 'assigned'} level classes
                    </CardDescription>
                  </div>
                  <Link href="/classes">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {upcomingClasses.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingClasses.map(classSession => {
                      const isEnrolled = enrolledClassIds.has(classSession.id)

                      return (
                        <div
                          key={classSession.id}
                          className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent transition"
                        >
                          <div className="flex-shrink-0">
                            <Calendar className="w-10 h-10 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {classSession.cefrLevel} Level Class
                              {isEnrolled && (
                                <Badge variant="default" className="ml-2">Enrolled</Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {formatGMTDate(classSession.dateTime, 'PPpp')} GMT
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Instructor: {classSession.instructorName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {classSession.enrollmentCount}/{classSession.capacity} enrolled
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            {student.paymentStatus === 'active' ? (
                              isEnrolled ? (
                                <Link href={`/classes/${classSession.id}/join`}>
                                  <Button size="sm">Join Class</Button>
                                </Link>
                              ) : (
                                <Link href={`/classes`}>
                                  <Button size="sm" variant="outline">Enroll</Button>
                                </Link>
                              )
                            ) : (
                              <Button size="sm" disabled>
                                Locked
                              </Button>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming classes for your level yet.</p>
                    <p className="text-sm mt-2">New classes are added regularly!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Results History */}
            <Card>
              <CardHeader>
                <CardTitle>Test History</CardTitle>
                <CardDescription>Your placement test results</CardDescription>
              </CardHeader>
              <CardContent>
                {studentTestResults.length > 0 ? (
                  <div className="space-y-3">
                    {studentTestResults.map(result => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-semibold">CEFR Level: {result.assignedLevel}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatGMTDate(result.completedAt, 'PPP')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{result.score}/20</p>
                          <p className="text-xs text-muted-foreground">{result.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No test results yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/test">
                  <Button className="w-full" variant="default">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Take Placement Test
                  </Button>
                </Link>
                <Link href="/classes">
                  <Button className="w-full" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Browse Classes
                  </Button>
                </Link>
                <Link href="/materials">
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Class Materials
                  </Button>
                </Link>
                {student.paymentStatus === 'none' && (
                  <Link href="/pricing">
                    <Button className="w-full" variant="secondary">
                      <CreditCard className="w-4 h-4 mr-2" />
                      View Pricing
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Help Section */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Have questions about your classes or subscription?
                </p>
                <Link href="/contact">
                  <Button className="w-full" variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
