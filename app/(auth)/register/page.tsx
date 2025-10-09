'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { GraduationCap, UserPlus, Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    timezone: 'Europe/London',
    selfReportedLevel: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Redirect to login page with success message
      router.push('/login?registered=true')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-lg">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="font-poppins text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              L2+ English
            </span>
          </Link>
        </div>

        <Card className="border-2 border-gray-700 shadow-xl bg-gray-800">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center gap-2">
              <CardTitle className="font-poppins text-2xl font-bold text-white">Create Your Account</CardTitle>
              <div className="inline-flex items-center gap-1 bg-primary/10 backdrop-blur-sm px-2 py-1 rounded-full border border-primary/20">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs font-semibold text-primary">Free Test</span>
              </div>
            </div>
            <p className="font-inter text-base text-gray-100">
              Register to take your free placement test and start your English learning journey
            </p>
          </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="you@example.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="Min. 8 characters with uppercase, lowercase, number"
                required
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Must contain uppercase, lowercase, and number
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+44 20 1234 5678"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={formData.timezone}
                onValueChange={value => handleChange('timezone', value)}
                disabled={isLoading}
              >
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Europe/Paris (CET)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="America/Los_Angeles">America/Los_Angeles (PST)</SelectItem>
                  <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="selfReportedLevel">
                Self-Reported English Level <span className="text-muted-foreground">(Optional)</span>
              </Label>
              <Select
                value={formData.selfReportedLevel}
                onValueChange={value => handleChange('selfReportedLevel', value)}
                disabled={isLoading}
              >
                <SelectTrigger id="selfReportedLevel">
                  <SelectValue placeholder="Select your estimated level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A1">A1 - Beginner</SelectItem>
                  <SelectItem value="A2">A2 - Elementary</SelectItem>
                  <SelectItem value="B1">B1 - Intermediate</SelectItem>
                  <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                  <SelectItem value="C1">C1 - Advanced</SelectItem>
                  <SelectItem value="C2">C2 - Proficient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary-hover font-semibold py-6 rounded-xl transition-all hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Creating Account...</>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account & Take Free Test
                </>
              )}
            </Button>

            <div className="text-center space-y-3 pt-2">
              <p className="text-sm text-gray-300 font-inter">
                Already have an account?{' '}
                <Link href="/login" className="text-primary hover:text-primary-hover font-semibold hover:underline">
                  Log in
                </Link>
              </p>
              <Link href="/" className="block text-sm text-gray-400 hover:text-gray-200 font-inter">
                ← Back to home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
