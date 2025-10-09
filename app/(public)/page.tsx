import Link from 'next/link'
import { db } from '@/lib/db'
import { homepageContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default async function HomePage() {
  // Fetch homepage content from database
  const [content] = await db.select().from(homepageContent).where(eq(homepageContent.id, 1)).limit(1)

  // Default content if database is not seeded yet
  const defaultContent = {
    headline: 'Master English with L2+ English',
    subtext:
      'Achieve fluency with expert-led classes, personalized learning paths, and real-world practice.',
    step1Text: 'Take our free CEFR-based placement test to assess your current English level.',
    step2Text: 'Choose a course plan that fits your goals and schedule.',
    step3Text:
      'Join live online classes with native speakers and start improving immediately.',
    ctaText: 'Get Started Today',
  }

  const pageContent = content || defaultContent

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{pageContent.headline}</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{pageContent.subtext}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                {pageContent.ctaText}
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Take Free Pre-Test
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle>Take Placement Test</CardTitle>
                <CardDescription>{pageContent.step1Text}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle>Choose Your Plan</CardTitle>
                <CardDescription>{pageContent.step2Text}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle>Start Learning</CardTitle>
                <CardDescription>{pageContent.step3Text}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose L2+ English?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'CEFR-aligned curriculum (A1-C2)',
              'Native-speaking qualified instructors',
              'Small group classes for maximum interaction',
              'Flexible scheduling to fit your lifestyle',
              'Comprehensive materials and progress tracking',
              'Live online classes via Zoom',
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Master English?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students improving their English with L2+ English. Start with a free
            placement test today.
          </p>
          <Link href="/register">
            <Button size="lg">{pageContent.ctaText}</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
