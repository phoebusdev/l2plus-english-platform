import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { students, payments, classSessions, testResults } from '@/lib/db/schema'
import { eq, count, gte, and } from 'drizzle-orm'
import { StatCard } from '@/components/dashboard/StatCard'
import { Users, DollarSign, Calendar, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default async function AdminDashboard() {
  const session = await auth()

  // Check if user is admin
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  // Fetch statistics
  const [totalStudentsResult] = await db
    .select({ count: count() })
    .from(students)

  const [activeSubscriptionsResult] = await db
    .select({ count: count() })
    .from(students)
    .where(eq(students.paymentStatus, 'active'))

  const now = new Date()
  const [upcomingClassesResult] = await db
    .select({ count: count() })
    .from(classSessions)
    .where(gte(classSessions.dateTime, now))

  const [testsCompletedResult] = await db
    .select({ count: count() })
    .from(testResults)

  // Get recent test results
  const recentTests = await db
    .select({
      studentId: testResults.studentId,
      score: testResults.score,
      assignedLevel: testResults.assignedLevel,
      completedAt: testResults.completedAt,
    })
    .from(testResults)
    .orderBy(testResults.completedAt)
    .limit(10)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white font-poppins">
          Admin Dashboard
        </h1>
        <p className="text-gray-300 mt-2 font-inter">
          Platform overview and key metrics
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Students"
          value={totalStudentsResult.count}
          icon={Users}
          iconColor="text-blue-600"
        />
        <StatCard
          label="Active Subscriptions"
          value={activeSubscriptionsResult.count}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <StatCard
          label="Upcoming Classes"
          value={upcomingClassesResult.count}
          icon={Calendar}
          iconColor="text-purple-600"
        />
        <StatCard
          label="Tests Completed"
          value={testsCompletedResult.count}
          icon={FileText}
          iconColor="text-orange-600"
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Placement Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {recentTests.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tests completed yet
            </p>
          ) : (
            <div className="space-y-4">
              {recentTests.map((test, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      Student ID: {test.studentId.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(test.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">
                      {test.score}/25
                    </p>
                    <span className="text-sm px-2 py-1 bg-primary/10 text-primary rounded">
                      {test.assignedLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
