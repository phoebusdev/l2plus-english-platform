import { Card, CardContent } from '@/components/ui/card'
import { mockAboutContent, isMockMode } from '@/lib/mock/data'
import { Award, BookOpen, Users, Globe, Target, Sparkles } from 'lucide-react'

export default async function AboutPage() {
  // Use mock content for immediate demo
  // TODO: Replace with real database fetch when connected
  const content = isMockMode() ? mockAboutContent : mockAboutContent // For now, always use mock

  const instructors = content.instructorPhotos as Array<{
    name: string
    photoUrl: string
    bio: string
  }>

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-secondary via-secondary to-secondary/95 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="font-inter text-sm font-medium">About L2+ English</span>
          </div>
          <h1 className="font-poppins text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Empowering English Learners Worldwide
          </h1>
          <p className="font-inter text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto">
            We're dedicated to providing high-quality, accessible English language education through innovative online learning.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="relative group border border-gray-700/50 hover:border-primary/30 transition-all duration-200 ease-out hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.01] bg-gray-800/80 backdrop-blur-sm shadow-card-default">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

              <CardContent className="relative p-6 text-center z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-primary-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold mb-4 text-white tracking-tight">Our Mission</h3>
                <p className="font-inter text-gray-100 leading-[1.65]">
                  To provide world-class English education that is accessible, effective, and tailored to individual learning needs.
                </p>
              </CardContent>
            </Card>

            <Card className="relative group border border-gray-700/50 hover:border-accent/30 transition-all duration-200 ease-out hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.01] bg-gray-800/80 backdrop-blur-sm shadow-card-default">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

              <CardContent className="relative p-6 text-center z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-[0_4px_12px_rgba(213,111,0,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold mb-4 text-white tracking-tight">Our Approach</h3>
                <p className="font-inter text-gray-100 leading-[1.65]">
                  CEFR-aligned curriculum delivered by native-speaking instructors in engaging, interactive online classes.
                </p>
              </CardContent>
            </Card>

            <Card className="relative group border border-gray-700/50 hover:border-secondary/30 transition-all duration-200 ease-out hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.01] bg-gray-800/80 backdrop-blur-sm shadow-card-default">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

              <CardContent className="relative p-6 text-center z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center shadow-[0_4px_12px_rgba(29,53,87,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-200">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-poppins text-xl font-bold mb-4 text-white tracking-tight">Our Reach</h3>
                <p className="font-inter text-gray-100 leading-[1.65]">
                  Serving thousands of students worldwide, from beginners to advanced learners, across all time zones.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div
            className="prose prose-lg prose-headings:font-poppins prose-headings:text-white prose-p:font-inter prose-p:text-gray-100 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary-hover prose-strong:text-white max-w-none prose-invert"
            dangerouslySetInnerHTML={{ __html: content.contentHtml }}
          />
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-white">
              Meet Our Instructors
            </h2>
            <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Our team of experienced, native-speaking instructors are passionate about helping you achieve your English language goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instructors.map((instructor, i) => (
              <Card key={i} className="relative group border border-gray-700/50 hover:border-primary/30 transition-all duration-200 ease-out hover:shadow-card-hover hover:-translate-y-1 hover:scale-[1.01] bg-gray-800/80 backdrop-blur-sm shadow-card-default">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

                <CardContent className="relative p-6 z-10">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-full group-hover:scale-110 transition-transform duration-200 shadow-primary-glow" />
                      <div className="relative w-full h-full rounded-full bg-gray-900 flex items-center justify-center m-1">
                        <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent font-poppins">
                          {instructor.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <h3 className="font-poppins font-bold text-xl mb-3 text-white tracking-tight">{instructor.name}</h3>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary font-semibold tracking-wide">Native Speaker</span>
                    </div>
                    <p className="font-inter text-sm text-gray-100 leading-[1.65]">{instructor.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
