'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CEFRBadge } from '@/components/ui/CEFRBadge'
import {
  Calendar,
  Users,
  Upload,
  FileText,
  Download,
  Trash2,
  ArrowLeft,
  Loader2,
} from 'lucide-react'
import { CEFRLevel } from '@/lib/constants/cefr-colors'

interface ClassSession {
  id: string
  dateTime: string
  cefrLevel: CEFRLevel
  zoomUrl: string
  capacity: number
  enrollmentCount: number
  instructorName: string | null
  createdAt: string
}

interface Material {
  id: string
  filename: string
  filePath: string
  fileSizeBytes: number
  uploadedAt: string
}

export default function AdminClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const classId = params.id as string

  const [classSession, setClassSession] = useState<ClassSession | null>(null)
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClassDetails()
    fetchMaterials()
  }, [classId])

  async function fetchClassDetails() {
    try {
      const response = await fetch(`/api/admin/classes/${classId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch class details')
      }
      const data = await response.json()
      setClassSession(data.classSession)
    } catch (error) {
      console.error('Failed to fetch class details:', error)
      setError('Failed to load class details')
    } finally {
      setLoading(false)
    }
  }

  async function fetchMaterials() {
    try {
      const response = await fetch(`/api/materials/${classId}`)
      if (response.ok) {
        const data = await response.json()
        setMaterials(data.materials || [])
      }
    } catch (error) {
      console.error('Failed to fetch materials:', error)
    }
  }

  async function handleFileUpload() {
    if (!selectedFile) {
      setError('Please select a file to upload')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('class_session_id', classId)
      formData.append('file', selectedFile)

      const response = await fetch('/api/admin/materials', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      // Refresh materials list
      await fetchMaterials()
      setSelectedFile(null)

      // Reset file input
      const fileInput = document.getElementById('file-input') as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (error: any) {
      console.error('Upload error:', error)
      setError(error.message || 'Failed to upload material')
    } finally {
      setUploading(false)
    }
  }

  async function handleDeleteMaterial(materialId: string) {
    if (!confirm('Are you sure you want to delete this material?')) return

    try {
      const response = await fetch(`/api/admin/materials?id=${materialId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete material')
      }

      // Refresh materials list
      await fetchMaterials()
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete material')
    }
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!classSession) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Class session not found</p>
        <Button onClick={() => router.push('/admin/classes')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Classes
        </Button>
      </div>
    )
  }

  const classDate = new Date(classSession.dateTime)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.push('/admin/classes')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-gray-900 font-poppins">Class Details</h1>
      </div>

      {/* Class Information */}
      <Card>
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">CEFR Level</Label>
              <div className="mt-1">
                <CEFRBadge level={classSession.cefrLevel} size="md" />
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Date & Time</Label>
              <p className="text-lg font-medium flex items-center gap-2 mt-1">
                <Calendar className="h-5 w-5 text-primary" />
                {classDate.toLocaleString('en-GB')}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-600">Capacity</Label>
              <p className="text-lg font-medium flex items-center gap-2 mt-1">
                <Users className="h-5 w-5 text-primary" />
                {classSession.enrollmentCount} / {classSession.capacity}
              </p>
            </div>

            {classSession.instructorName && (
              <div>
                <Label className="text-sm font-medium text-gray-600">Instructor</Label>
                <p className="text-lg font-medium mt-1">{classSession.instructorName}</p>
              </div>
            )}

            <div className="md:col-span-2">
              <Label className="text-sm font-medium text-gray-600">Zoom URL</Label>
              <p className="text-sm text-gray-700 break-all mt-1">{classSession.zoomUrl}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Class Material</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-input">PDF File (Max 10MB)</Label>
            <Input
              id="file-input"
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  if (file.size > 10 * 1024 * 1024) {
                    setError('File size exceeds 10MB limit')
                    e.target.value = ''
                  } else if (file.type !== 'application/pdf') {
                    setError('Only PDF files are allowed')
                    e.target.value = ''
                  } else {
                    setSelectedFile(file)
                    setError(null)
                  }
                }
              }}
              disabled={uploading}
            />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>

          <Button onClick={handleFileUpload} disabled={!selectedFile || uploading}>
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Class Materials ({materials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No materials uploaded yet</p>
          ) : (
            <div className="space-y-3">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <p className="font-medium text-gray-900">{material.filename}</p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(material.fileSizeBytes)} •{' '}
                        {new Date(material.uploadedAt).toLocaleDateString('en-GB')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(material.filePath, '_blank')}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteMaterial(material.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
