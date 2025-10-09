import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { mockPricingPlans } from '@/lib/mock/data'

export default async function PricingPage() {
  // Use mock pricing plans for immediate demo
  // TODO: Replace with real database fetch when connected
  const plans = mockPricingPlans

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Select the plan that fits your learning goals and schedule
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map(plan => {
            const features = (plan.features as string[]) || []
            const priceDisplay = `£${(plan.priceGbp / 100).toFixed(2)}`
            const billingText = plan.billingCycle === 'monthly' ? '/month' : 'one-time'

            return (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="min-h-[60px]">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{priceDisplay}</span>
                    <span className="text-muted-foreground">{billingText}</span>
                  </div>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register" className="w-full">
                    <Button className="w-full">Select Plan</Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include access to class materials, progress tracking, and email support
          </p>
          <Link href="/register" className="text-primary hover:underline">
            Start with a free placement test →
          </Link>
        </div>
      </div>
    </div>
  )
}
