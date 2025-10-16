'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, FileQuestion, AlertCircle } from 'lucide-react'

interface Question {
  id: number
  questionText: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  page: number
}

const PAGE_DESCRIPTIONS = {
  1: 'Conversational English (Questions 1-5)',
  2: 'Grammar Basics (Questions 6-10)',
  3: 'Advanced Grammar (Questions 11-15)',
  4: 'Vocabulary (Questions 16-20)',
  5: 'Advanced Vocabulary & Comprehension (Questions 21-25)',
}

export default function AdminTestManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [testVersion, setTestVersion] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    fetchQuestions()
  }, [])

  async function fetchQuestions() {
    try {
      const response = await fetch('/api/admin/test/questions')
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions || [])
        setTestVersion(data.version || 0)
      } else {
        alert('Failed to load test questions')
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
      alert('Failed to load test questions')
    } finally {
      setLoading(false)
    }
  }

  function updateQuestion(id: number, field: string, value: string) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    )
    setHasUnsavedChanges(true)
  }

  function getPageQuestions(page: number): Question[] {
    return questions
      .filter((q) => q.page === page)
      .sort((a, b) => a.id - b.id)
  }

  async function handleSave() {
    // Validate all questions are filled
    for (const question of questions) {
      if (
        !question.questionText ||
        !question.optionA ||
        !question.optionB ||
        !question.optionC ||
        !question.optionD ||
        !question.correctAnswer
      ) {
        alert(`Question ${question.id} is incomplete. Please fill all fields.`)
        return
      }
    }

    // Confirm save (creates new version)
    if (
      !confirm(
        `This will create a new test version (v${testVersion + 1}). The old version (v${testVersion}) will be deactivated. Continue?`
      )
    ) {
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/admin/test/questions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save test questions')
      }

      alert('Test questions saved successfully!')
      await fetchQuestions()
      setHasUnsavedChanges(false)
    } catch (error: any) {
      console.error('Save error:', error)
      alert(`Failed to save: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const pageQuestions = getPageQuestions(currentPage)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileQuestion className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 font-poppins">
              Test Question Management
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Current Version: v{testVersion} | Total Questions: {questions.length}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving || !hasUnsavedChanges} size="lg">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>

      {hasUnsavedChanges && (
        <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-800 font-medium">
            You have unsaved changes. Remember to save before leaving this page.
          </p>
        </div>
      )}

      {/* Page Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Test Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
                className="flex-col h-auto py-3"
              >
                <span className="font-bold">Page {page}</span>
                <span className="text-xs mt-1">
                  {PAGE_DESCRIPTIONS[page as keyof typeof PAGE_DESCRIPTIONS]}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Questions for Current Page */}
      <div className="space-y-6">
        {pageQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">
                Question {question.id} (Page {question.page})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Question Text */}
              <div className="space-y-2">
                <Label htmlFor={`q${question.id}-text`}>Question Text</Label>
                <textarea
                  id={`q${question.id}-text`}
                  value={question.questionText}
                  onChange={(e) =>
                    updateQuestion(question.id, 'questionText', e.target.value)
                  }
                  className="w-full min-h-[80px] p-3 border rounded-md"
                  placeholder="Enter question text..."
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(['A', 'B', 'C', 'D'] as const).map((option) => (
                  <div key={option} className="space-y-2">
                    <Label htmlFor={`q${question.id}-opt${option}`}>Option {option}</Label>
                    <Input
                      id={`q${question.id}-opt${option}`}
                      value={question[`option${option}` as keyof Question] as string}
                      onChange={(e) =>
                        updateQuestion(question.id, `option${option}`, e.target.value)
                      }
                      placeholder={`Option ${option}`}
                    />
                  </div>
                ))}
              </div>

              {/* Correct Answer */}
              <div className="space-y-2">
                <Label>Correct Answer</Label>
                <div className="flex gap-3">
                  {(['A', 'B', 'C', 'D'] as const).map((option) => (
                    <label
                      key={option}
                      className={`flex items-center gap-2 p-3 border-2 rounded-md cursor-pointer transition-colors ${
                        question.correctAnswer === option
                          ? 'border-primary bg-primary/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${question.id}-correct`}
                        value={option}
                        checked={question.correctAnswer === option}
                        onChange={(e) =>
                          updateQuestion(question.id, 'correctAnswer', e.target.value)
                        }
                        className="w-4 h-4"
                      />
                      <span className="font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-center pb-8">
        <Button onClick={handleSave} disabled={saving || !hasUnsavedChanges} size="lg">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
