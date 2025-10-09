import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react'
import { mockPricingPlans } from '@/lib/mock/data'
import { cn } from '@/lib/utils'

export default async function PricingPage() {
  // Use mock pricing plans for immediate demo
  // TODO: Replace with real database fetch when connected
  const plans = mockPricingPlans

  // Identify most popular plan (usually the second plan - Standard)
  const popularPlanId = plans[1]?.id || plans[0]?.id

  return (
    <div className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-inter text-sm font-semibold text-primary">Flexible Pricing for Every Goal</span>
          </div>
          <h1 className="font-poppins text-4xl md:text-5xl font-extrabold mb-6 text-white">
            Choose Your Plan
          </h1>
          <p className="font-inter text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
            Select the plan that fits your learning goals and schedule. All plans include CEFR-aligned curriculum and native-speaking instructors.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map(plan => {
            const features = (plan.features as string[]) || []
            const priceDisplay = `£${(plan.priceGbp / 100).toFixed(2)}`
            const billingText = plan.billingCycle === 'monthly' ? '/month' : 'one-time'
            const isPopular = plan.id === popularPlanId

            return (
              <Card
                key={plan.id}
                className={cn(
                  'group relative flex flex-col transition-all duration-200 ease-out',
                  'hover:-translate-y-1 hover:scale-[1.01]',
                  'backdrop-blur-sm',
                  isPopular
                    ? 'border border-primary/40 bg-gray-800/90 shadow-primary-subtle hover:shadow-primary-hover'
                    : 'border border-gray-700/50 bg-gray-800/80 shadow-card-default hover:shadow-card-hover hover:border-primary/30'
                )}
              >
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent rounded-xl pointer-events-none" />

                {/* Popular Badge - Enhanced */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-white px-4 py-2 rounded-full shadow-primary-glow text-sm font-bold">
                      <Crown className="w-4 h-4 animate-pulse" />
                      <span className="tracking-wide">Most Popular</span>
                    </div>
                  </div>
                )}

                <CardHeader className="relative pt-6 pb-6 z-10">
                  <CardTitle className="font-poppins text-2xl font-bold text-white tracking-tight leading-tight">
                    {plan.name}
                  </CardTitle>
                  <p className="font-inter text-base min-h-[60px] text-gray-100 leading-[1.65] tracking-normal">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="relative flex-1 z-10">
                  {/* Price - Enhanced typography */}
                  <div className="mb-8 pb-6 border-b border-gray-700/50">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white font-poppins tracking-tight leading-none">
                        {priceDisplay}
                      </span>
                      <span className="text-lg text-gray-400 font-inter font-medium tracking-wide">
                        {billingText}
                      </span>
                    </div>
                  </div>

                  {/* Features - Enhanced with micro-interactions */}
                  <ul className="space-y-4">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 ring-1 ring-primary/20 group-hover/item:ring-primary/40 group-hover/item:bg-primary/20 transition-all duration-200">
                          <Check className="w-3 h-3 text-primary group-hover/item:scale-110 transition-transform duration-200" />
                        </div>
                        <span className="text-sm font-inter text-gray-100 leading-[1.65] font-medium tracking-normal">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="relative pt-6 z-10">
                  <Link href="/register" className="w-full">
                    <Button
                      className={cn(
                        'w-full font-semibold text-base py-6 rounded-xl transition-all duration-200',
                        'active:scale-[0.98] active:shadow-inner',
                        'hover:scale-[1.02]',
                        isPopular
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover shadow-primary-glow hover:shadow-primary-glow-hover ring-1 ring-primary/20'
                          : 'bg-secondary hover:bg-secondary-hover shadow-button hover:shadow-button-hover ring-1 ring-secondary/20'
                      )}
                    >
                      {isPopular && <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />}
                      Select {plan.name}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA - Enhanced */}
        <div className="mt-16 text-center bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-8 md:p-12 shadow-depth-2 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-5 h-5 text-accent fill-accent transition-transform duration-200 hover:scale-110" />
              <Star className="w-5 h-5 text-accent fill-accent transition-transform duration-200 hover:scale-110" />
              <Star className="w-5 h-5 text-accent fill-accent transition-transform duration-200 hover:scale-110" />
              <Star className="w-5 h-5 text-accent fill-accent transition-transform duration-200 hover:scale-110" />
              <Star className="w-5 h-5 text-accent fill-accent transition-transform duration-200 hover:scale-110" />
            </div>
            <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight leading-tight">
              Not sure which plan is right for you?
            </h3>
            <p className="font-inter text-lg text-gray-100 mb-8 leading-[1.65]">
              All plans include access to class materials, progress tracking, and email support. Start with a free placement test to determine your level.
            </p>
            <Link href="/register">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/70 bg-white/5 text-white hover:bg-white/15 hover:border-white font-semibold px-8 py-6 text-base rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-button hover:shadow-button-hover"
              >
                Take Free Placement Test →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
