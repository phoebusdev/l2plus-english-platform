'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Loader2 } from 'lucide-react'

interface ExportSection {
  id: string
  title: string
  description: string
  endpoint: string
  icon: typeof FileText
}

const EXPORT_SECTIONS: ExportSection[] = [
  {
    id: 'students',
    title: 'Students',
    description: 'Export all student data including names, emails, CEFR levels, payment status, and registration dates',
    endpoint: '/api/admin/export/students',
    icon: FileText,
  },
  {
    id: 'payments',
    title: 'Payments',
    description: 'Export payment records with student info, plan details, Stripe IDs, and payment dates',
    endpoint: '/api/admin/export/payments',
    icon: FileText,
  },
  {
    id: 'tests',
    title: 'Test Results',
    description: 'Export placement test results with scores, percentages, assigned CEFR levels, and test dates',
    endpoint: '/api/admin/export/tests',
    icon: FileText,
  },
  {
    id: 'classes',
    title: 'Class Sessions',
    description: 'Export class schedule with dates, CEFR levels, Zoom URLs, capacity, and enrollment counts',
    endpoint: '/api/admin/export/classes',
    icon: FileText,
  },
  {
    id: 'enrollments',
    title: 'Enrollments',
    description: 'Export student enrollments with class details, attendance status, and enrollment dates',
    endpoint: '/api/admin/export/enrollments',
    icon: FileText,
  },
]

export default function AdminExportPage() {
  const [downloading, setDownloading] = useState<string | null>(null)

  async function handleExport(section: ExportSection) {
    setDownloading(section.id)

    try {
      const response = await fetch(section.endpoint)

      if (!response.ok) {
        throw new Error('Export failed')
      }

      // Get filename from Content-Disposition header or generate one
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = `${section.id}-${new Date().toISOString().split('T')[0]}.csv`

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i)
        if (filenameMatch) {
          filename = filenameMatch[1]
        }
      }

      // Download the file
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Export error:', error)
      alert(`Failed to export ${section.title}. Please try again.`)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-2">Data Export</h1>
        <p className="text-gray-600">
          Download CSV exports of platform data for analysis, reporting, or backup purposes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {EXPORT_SECTIONS.map((section) => {
          const Icon = section.icon
          const isDownloading = downloading === section.id

          return (
            <Card key={section.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                      <CardDescription className="mt-1.5">{section.description}</CardDescription>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleExport(section)}
                    disabled={isDownloading}
                    variant="outline"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download CSV
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900">Export Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-800">
          <ul className="list-disc list-inside space-y-1">
            <li>All exports are in CSV format and can be opened in Excel, Google Sheets, or any spreadsheet application</li>
            <li>Exports include all historical data up to the current date</li>
            <li>Data is sorted chronologically by default (newest first)</li>
            <li>Exported files are named with the current date for easy organization</li>
            <li>No data is modified or deleted during export operations</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
