'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import { Calendar, Users, Trash2 } from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface ClassSession {
  id: string
  dateTime: string
  cefrLevel: CEFRLevel
  capacity: number
  enrollmentCount: number
  instructorName: string | null
}

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchClasses()
  }, [])

  async function fetchClasses() {
    try {
      const response = await fetch('/api/admin/classes')
      const data = await response.json()
      setClasses(data.classes || [])
    } catch (error) {
      console.error('Failed to fetch classes:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this class?')) return

    try {
      await fetch(`/api/admin/classes/${id}`, { method: 'DELETE' })
      fetchClasses()
    } catch (error) {
      console.error('Failed to delete class:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading classes...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-gray-900 font-poppins">
          Class Management
        </h1>
        <div className="text-2xl font-semibold text-primary">
          {classes.length} Classes
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Classes</CardTitle>
        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No classes scheduled</p>
          ) : (
            <div className="space-y-4">
              {classes.map((classSession) => {
                const classDate = new Date(classSession.dateTime)
                return (
                  <div
                    key={classSession.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CEFRBadge level={classSession.cefrLevel} size="sm" />
                        <span className="font-medium">
                          {classDate.toLocaleString('en-GB')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {classSession.enrollmentCount}/{classSession.capacity}
                        </span>
                        {classSession.instructorName && (
                          <span>Instructor: {classSession.instructorName}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(classSession.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
