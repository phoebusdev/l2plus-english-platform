'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronRight } from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface Student {
  id: string
  email: string
  fullName: string
  phone: string | null
  assignedCefrLevel: CEFRLevel | null
  paymentStatus: string
  createdAt: string
}

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchStudents()
  }, [])

  async function fetchStudents() {
    try {
      const response = await fetch('/api/admin/students')
      const data = await response.json()
      setStudents(data.students || [])
    } catch (error) {
      console.error('Failed to fetch students:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase())
  )

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'failed':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading students...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-poppins">
            Student Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage student accounts and CEFR levels
          </p>
        </div>
        <div className="text-2xl font-semibold text-primary">
          {students.length} Students
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>All Students</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No students found
            </p>
          ) : (
            <div className="space-y-2">
              {filteredStudents.map((student) => (
                <Link
                  key={student.id}
                  href={`/admin/students/${student.id}`}
                  className="block"
                >
                  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold text-gray-900">
                          {student.fullName}
                        </p>
                        {student.assignedCefrLevel && (
                          <CEFRBadge
                            level={student.assignedCefrLevel}
                            size="sm"
                            showLabel={false}
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{student.email}</span>
                        {student.phone && <span>{student.phone}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <Badge
                        className={getPaymentStatusColor(student.paymentStatus)}
                      >
                        {student.paymentStatus}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
