'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Save, FileText, Home } from 'lucide-react'

interface HomepageContent {
  headline: string
  subtext: string
  step1Text: string
  step2Text: string
  step3Text: string
  ctaText: string
}

interface AboutUsContent {
  contentHtml: string
  instructorPhotos: Array<{
    name: string
    photoUrl: string
    bio: string
  }>
}

export default function AdminContentManagementPage() {
  const [activeTab, setActiveTab] = useState<'homepage' | 'about'>('homepage')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Homepage state
  const [homepageData, setHomepageData] = useState<HomepageContent | null>(null)
  const [homepageForm, setHomepageForm] = useState<HomepageContent>({
    headline: '',
    subtext: '',
    step1Text: '',
    step2Text: '',
    step3Text: '',
    ctaText: '',
  })

  // About Us state
  const [aboutData, setAboutData] = useState<AboutUsContent | null>(null)
  const [aboutForm, setAboutForm] = useState<AboutUsContent>({
    contentHtml: '',
    instructorPhotos: [],
  })

  useEffect(() => {
    fetchContent()
  }, [activeTab])

  async function fetchContent() {
    setLoading(true)
    try {
      if (activeTab === 'homepage') {
        const response = await fetch('/api/admin/content/homepage')
        if (response.ok) {
          const data = await response.json()
          setHomepageData(data.content)
          setHomepageForm(data.content)
        }
      } else {
        const response = await fetch('/api/admin/content/about')
        if (response.ok) {
          const data = await response.json()
          setAboutData(data.content)
          setAboutForm(data.content)
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error)
      alert('Failed to load content')
    } finally {
      setLoading(false)
    }
  }

  async function handleSaveHomepage() {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/content/homepage', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homepageForm),
      })

      if (!response.ok) {
        throw new Error('Failed to save homepage content')
      }

      alert('Homepage content saved successfully')
      await fetchContent()
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save homepage content')
    } finally {
      setSaving(false)
    }
  }

  async function handleSaveAbout() {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/content/about', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutForm),
      })

      if (!response.ok) {
        throw new Error('Failed to save about us content')
      }

      alert('About us content saved successfully')
      await fetchContent()
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save about us content')
    } finally {
      setSaving(false)
    }
  }

  function addInstructor() {
    setAboutForm({
      ...aboutForm,
      instructorPhotos: [
        ...aboutForm.instructorPhotos,
        { name: '', photoUrl: '', bio: '' },
      ],
    })
  }

  function removeInstructor(index: number) {
    setAboutForm({
      ...aboutForm,
      instructorPhotos: aboutForm.instructorPhotos.filter((_, i) => i !== index),
    })
  }

  function updateInstructor(index: number, field: string, value: string) {
    const updated = [...aboutForm.instructorPhotos]
    updated[index] = { ...updated[index], [field]: value }
    setAboutForm({ ...aboutForm, instructorPhotos: updated })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 font-poppins">Content Management</h1>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'homepage'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Home className="h-4 w-4" />
          Homepage
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 font-medium flex items-center gap-2 ${
            activeTab === 'about'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="h-4 w-4" />
          About Us
        </button>
      </div>

      {/* Homepage Content */}
      {activeTab === 'homepage' && (
        <Card>
          <CardHeader>
            <CardTitle>Homepage Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={homepageForm.headline}
                onChange={(e) =>
                  setHomepageForm({ ...homepageForm, headline: e.target.value })
                }
                maxLength={255}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtext">Subtext</Label>
              <textarea
                id="subtext"
                value={homepageForm.subtext}
                onChange={(e) =>
                  setHomepageForm({ ...homepageForm, subtext: e.target.value })
                }
                className="w-full min-h-[100px] p-3 border rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="step1">Step 1 Text</Label>
                <textarea
                  id="step1"
                  value={homepageForm.step1Text}
                  onChange={(e) =>
                    setHomepageForm({ ...homepageForm, step1Text: e.target.value })
                  }
                  className="w-full min-h-[80px] p-3 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step2">Step 2 Text</Label>
                <textarea
                  id="step2"
                  value={homepageForm.step2Text}
                  onChange={(e) =>
                    setHomepageForm({ ...homepageForm, step2Text: e.target.value })
                  }
                  className="w-full min-h-[80px] p-3 border rounded-md"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="step3">Step 3 Text</Label>
                <textarea
                  id="step3"
                  value={homepageForm.step3Text}
                  onChange={(e) =>
                    setHomepageForm({ ...homepageForm, step3Text: e.target.value })
                  }
                  className="w-full min-h-[80px] p-3 border rounded-md"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta">Call-to-Action Button Text</Label>
              <Input
                id="cta"
                value={homepageForm.ctaText}
                onChange={(e) => setHomepageForm({ ...homepageForm, ctaText: e.target.value })}
                maxLength={100}
              />
            </div>

            <Button onClick={handleSaveHomepage} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Homepage Content
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* About Us Content */}
      {activeTab === 'about' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Main Content (HTML)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content HTML</Label>
                <textarea
                  id="content"
                  value={aboutForm.contentHtml}
                  onChange={(e) =>
                    setAboutForm({ ...aboutForm, contentHtml: e.target.value })
                  }
                  className="w-full min-h-[200px] p-3 border rounded-md font-mono text-sm"
                  placeholder="Enter HTML content..."
                />
                <p className="text-xs text-gray-600">
                  You can use HTML tags for formatting (p, h2, h3, ul, li, etc.)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Instructor Photos</CardTitle>
                <Button onClick={addInstructor} variant="outline" size="sm">
                  Add Instructor
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {aboutForm.instructorPhotos.length === 0 ? (
                <p className="text-center py-8 text-gray-500">No instructors added yet</p>
              ) : (
                aboutForm.instructorPhotos.map((instructor, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Instructor {index + 1}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeInstructor(index)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={instructor.name}
                          onChange={(e) => updateInstructor(index, 'name', e.target.value)}
                          placeholder="Instructor name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Photo URL</Label>
                        <Input
                          value={instructor.photoUrl}
                          onChange={(e) => updateInstructor(index, 'photoUrl', e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Bio</Label>
                      <textarea
                        value={instructor.bio}
                        onChange={(e) => updateInstructor(index, 'bio', e.target.value)}
                        className="w-full min-h-[80px] p-3 border rounded-md"
                        placeholder="Instructor bio..."
                      />
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Button onClick={handleSaveAbout} disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save About Us Content
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}
