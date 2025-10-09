import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle2,
  Target,
  GraduationCap,
  Users,
  Calendar,
  BookOpen,
  Video,
  Award,
  Clock,
  Globe,
  TrendingUp,
  Sparkles
} from 'lucide-react'
import { mockHomepageContent } from '@/lib/mock/data'

export default async function HomePage() {
  // Use mock content for immediate demo
  // TODO: Replace with real database fetch when connected
  const pageContent = mockHomepageContent

  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern Gradient with Depth */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-primary via-primary to-accent text-white overflow-hidden">
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto max-w-6xl text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="font-inter text-sm font-medium">CEFR-Aligned Professional English Learning</span>
          </div>

          <h1 className="font-poppins text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            {pageContent.headline}
          </h1>
          <p className="font-inter text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed text-white/95">
            {pageContent.subtext}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary text-white hover:bg-secondary-hover shadow-2xl text-base md:text-lg px-8 py-6 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-3xl"
              >
                <GraduationCap className="w-5 h-5 mr-2" />
                {pageContent.ctaText}
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 text-base md:text-lg px-8 py-6 rounded-xl font-semibold transition-all hover:scale-105"
              >
                <Target className="w-5 h-5 mr-2" />
                Take Free Placement Test
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-white/90 font-inter text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Native-speaking instructors</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>CEFR-aligned curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Live online classes</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-white">
              How It Works
            </h2>
            <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Get started in three simple steps and begin your English learning journey today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary opacity-20" />

            {/* Step 1 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-700 hover:border-primary/30 bg-gray-800">
              <CardHeader className="text-center p-6">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/70 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full shadow-md flex items-center justify-center font-bold text-primary text-lg border-2 border-primary">
                    1
                  </div>
                </div>
                <CardTitle className="font-poppins text-2xl mb-4 text-white">Take Placement Test</CardTitle>
                <p className="font-inter text-base leading-relaxed text-gray-100">
                  {pageContent.step1Text}
                </p>
              </CardHeader>
            </Card>

            {/* Step 2 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-700 hover:border-accent/30 bg-gray-800">
              <CardHeader className="text-center p-6">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/70 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full shadow-md flex items-center justify-center font-bold text-accent text-lg border-2 border-accent">
                    2
                  </div>
                </div>
                <CardTitle className="font-poppins text-2xl mb-4 text-white">Choose Your Plan</CardTitle>
                <p className="font-inter text-base leading-relaxed text-gray-100">
                  {pageContent.step2Text}
                </p>
              </CardHeader>
            </Card>

            {/* Step 3 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-700 hover:border-secondary/30 bg-gray-800">
              <CardHeader className="text-center p-6">
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full shadow-md flex items-center justify-center font-bold text-secondary text-lg border-2 border-secondary">
                    3
                  </div>
                </div>
                <CardTitle className="font-poppins text-2xl mb-4 text-white">Start Learning</CardTitle>
                <p className="font-inter text-base leading-relaxed text-gray-100">
                  {pageContent.step3Text}
                </p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold mb-6 text-white">
              Why Choose L2+ English?
            </h2>
            <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
              Experience world-class English education with our proven methodology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { text: 'CEFR-aligned curriculum (A1-C2)', icon: Target, gradient: 'from-primary to-accent' },
              { text: 'Native-speaking qualified instructors', icon: GraduationCap, gradient: 'from-accent to-primary' },
              { text: 'Small group classes for maximum interaction', icon: Users, gradient: 'from-secondary to-primary' },
              { text: 'Flexible scheduling to fit your lifestyle', icon: Calendar, gradient: 'from-primary to-secondary' },
              { text: 'Comprehensive materials and progress tracking', icon: BookOpen, gradient: 'from-accent to-secondary' },
              { text: 'Live online classes via Zoom', icon: Video, gradient: 'from-secondary to-accent' },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-6 rounded-xl border-2 border-gray-700 hover:border-primary/30 hover:bg-gradient-to-br hover:from-gray-800 hover:to-gray-900 transition-all group shadow-sm hover:shadow-md bg-gray-800"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 pt-2">
                    <span className="font-inter text-lg font-semibold text-white leading-relaxed">{feature.text}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-32 px-4 bg-gradient-to-br from-secondary via-secondary to-secondary/90 text-white overflow-hidden">
        {/* Animated decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/20">
            <Globe className="w-4 h-4" />
            <span className="font-inter text-sm font-medium">Join thousands of successful students worldwide</span>
          </div>

          <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Master English?
          </h2>
          <p className="font-inter text-lg md:text-xl mb-12 text-white/95 leading-relaxed max-w-2xl mx-auto">
            Join thousands of students improving their English with L2+ English. Start with a free
            placement test today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/register" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white shadow-2xl text-base md:text-lg px-10 py-6 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-3xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {pageContent.ctaText}
              </Button>
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white bg-white/5 backdrop-blur-sm text-white hover:bg-white/15 text-base md:text-lg px-10 py-6 rounded-xl font-semibold transition-all"
              >
                View Pricing Plans
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 text-white/80 font-inter text-sm">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-secondary flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                ))}
              </div>
              <span>2,500+ active students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>10,000+ hours of classes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
