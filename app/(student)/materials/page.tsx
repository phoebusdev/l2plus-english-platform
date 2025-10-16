'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import { Calendar, FileText, Download, AlertCircle, BookOpen } from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface Material {
  id: string
  filename: string
  fileSizeBytes: number
  uploadedAt: string
  downloadUrl: string
}

interface ClassWithMaterials {
  classId: string
  className: string | null
  cefrLevel: CEFRLevel
  dateTime: string
  zoomUrl: string
  materials: Material[]
}

interface MaterialsResponse {
  classes: ClassWithMaterials[]
  studentLevel: CEFRLevel
}

export default function MaterialsPage() {
  const [data, setData] = useState<MaterialsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMaterials()
  }, [])

  async function fetchMaterials() {
    try {
      const response = await fetch('/api/materials')

      if (!response.ok) {
        throw new Error('Failed to load materials')
      }

      const data = await response.json()
      setData(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load materials')
    } finally {
      setLoading(false)
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  function handleDownload(url: string, filename: string) {
    // Create temporary link and trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">Loading materials...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const totalMaterials = data.classes.reduce(
    (sum, cls) => sum + cls.materials.length,
    0
  )

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
          My Materials
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-lg text-gray-600">Your Level:</p>
          <CEFRBadge level={data.studentLevel} />
          <span className="text-sm text-gray-500">
            • {data.classes.length} enrolled {data.classes.length === 1 ? 'class' : 'classes'}
            • {totalMaterials} {totalMaterials === 1 ? 'material' : 'materials'}
          </span>
        </div>
      </div>

      {/* Empty State */}
      {data.classes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Materials Yet</h3>
            <p className="text-gray-600 mb-6">
              Enroll in classes to access course materials and resources.
            </p>
            <Button asChild>
              <a href="/classes">Browse Classes</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {data.classes.map((classSession) => {
            const classDate = new Date(classSession.dateTime)
            const formattedDate = classDate.toLocaleDateString('en-GB', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })

            return (
              <Card key={classSession.classId} className="border-2">
                <CardHeader className="bg-gray-50 border-b">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CEFRBadge level={classSession.cefrLevel} size="sm" />
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Calendar className="h-4 w-4" />
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                      {classSession.className && (
                        <p className="text-sm text-gray-600">
                          Instructor: {classSession.className}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {classSession.materials.length}{' '}
                      {classSession.materials.length === 1 ? 'file' : 'files'}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {classSession.materials.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>No materials uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {classSession.materials.map((material) => {
                        const uploadedDate = new Date(material.uploadedAt)
                        const formattedUploadDate = uploadedDate.toLocaleDateString('en-GB', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })

                        return (
                          <div
                            key={material.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 truncate">
                                  {material.filename}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {formatFileSize(material.fileSizeBytes)} • Uploaded{' '}
                                  {formattedUploadDate}
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                handleDownload(material.downloadUrl, material.filename)
                              }
                              className="flex-shrink-0"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
