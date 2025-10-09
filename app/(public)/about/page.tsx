import { db } from '@/lib/db'
import { aboutUsContent } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { Card, CardContent } from '@/components/ui/card'

export default async function AboutPage() {
  // Fetch about us content from database
  const [content] = await db.select().from(aboutUsContent).where(eq(aboutUsContent.id, 1)).limit(1)

  // Default content if database is not seeded yet
  const defaultContent = {
    contentHtml: `
      <h2 class="text-3xl font-bold mb-4">About L2+ English</h2>
      <p class="mb-4">L2+ English is dedicated to helping learners achieve fluency through immersive, practical English education. Our experienced native-speaking instructors use proven methodologies to deliver engaging, results-driven lessons.</p>
      <p class="mb-4">We specialize in CEFR-aligned curriculum, ensuring every student progresses systematically from A1 (beginner) to C2 (proficient). Our live online classes combine structured learning with real-world conversation practice.</p>
      <h3 class="text-2xl font-semibold mb-3">Our Approach</h3>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Small group classes for maximum interaction</li>
        <li>CEFR-based placement testing and level assignment</li>
        <li>Native-speaking instructors with teaching qualifications</li>
        <li>Flexible scheduling to fit your lifestyle</li>
        <li>Comprehensive materials and progress tracking</li>
      </ul>
    `,
    instructorPhotos: [
      {
        name: 'Sarah Johnson',
        photoUrl: '/images/instructors/sarah.jpg',
        bio: 'CELTA-certified instructor with 10+ years of experience teaching English to international students.',
      },
      {
        name: 'Michael Chen',
        photoUrl: '/images/instructors/michael.jpg',
        bio: 'Specializes in business English and exam preparation (IELTS, TOEFL). MA in Applied Linguistics.',
      },
    ],
  }

  const pageContent = content || defaultContent
  const instructors = (pageContent.instructorPhotos as any[]) || defaultContent.instructorPhotos

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Content Section */}
        <div
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: pageContent.contentHtml }}
        />

        {/* Instructors Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Instructors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instructors.map((instructor, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-muted-foreground">
                        {instructor.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{instructor.name}</h3>
                      <p className="text-sm text-muted-foreground">{instructor.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
