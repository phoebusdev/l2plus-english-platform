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
    <div className="py-16 md:py-20 px-4 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-inter text-sm font-semibold text-primary">Flexible Pricing for Every Goal</span>
          </div>
          <h1 className="font-poppins text-4xl md:text-6xl font-extrabold mb-6 text-secondary">
            Choose Your Plan
          </h1>
          <p className="font-inter text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
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
                  'relative flex flex-col transition-all duration-300',
                  isPopular
                    ? 'border-2 border-primary shadow-2xl scale-105 z-10'
                    : 'border-2 border-gray-200 hover:border-primary/30 hover:shadow-xl'
                )}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent text-white px-4 py-1.5 rounded-full shadow-lg text-sm font-bold">
                      <Crown className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <CardHeader className={cn(isPopular ? 'pt-8' : 'pt-6')}>
                  <CardTitle className="font-poppins text-2xl font-bold text-secondary">
                    {plan.name}
                  </CardTitle>
                  <p className="font-inter text-base min-h-[60px] text-gray-700 leading-relaxed">
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Price */}
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-secondary font-poppins">{priceDisplay}</span>
                      <span className="text-lg text-gray-500 font-inter">{billingText}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm font-inter text-gray-800 leading-relaxed font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">
                  <Link href="/register" className="w-full">
                    <Button
                      className={cn(
                        'w-full font-semibold text-base py-6 rounded-xl transition-all',
                        isPopular
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover shadow-lg hover:shadow-xl'
                          : 'bg-secondary hover:bg-secondary-hover'
                      )}
                    >
                      {isPopular && <Zap className="w-4 h-4 mr-2" />}
                      Select {plan.name}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 text-accent fill-accent" />
              <Star className="w-5 h-5 text-accent fill-accent" />
              <Star className="w-5 h-5 text-accent fill-accent" />
              <Star className="w-5 h-5 text-accent fill-accent" />
              <Star className="w-5 h-5 text-accent fill-accent" />
            </div>
            <h3 className="font-poppins text-2xl md:text-3xl font-bold mb-4 text-secondary">
              Not sure which plan is right for you?
            </h3>
            <p className="font-inter text-lg text-gray-800 mb-6">
              All plans include access to class materials, progress tracking, and email support. Start with a free placement test to determine your level.
            </p>
            <Link href="/register">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-6 text-base rounded-xl transition-all">
                Take Free Placement Test →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
