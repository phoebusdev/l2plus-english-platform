import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PricingCardProps {
  name: string
  description: string
  price: number
  billingCycle: 'monthly' | 'one_time'
  features: string[]
  isFeatured?: boolean
  ctaText?: string
  onSelect?: () => void
  className?: string
}

export function PricingCard({
  name,
  description,
  price,
  billingCycle,
  features,
  isFeatured = false,
  ctaText = 'Select Plan',
  onSelect,
  className
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col h-full p-6 rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg',
        isFeatured && 'border-2 border-primary',
        className
      )}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1">
          Most Popular
        </Badge>
      )}

      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-2xl font-bold text-gray-900 font-poppins">
          {name}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex-1">
        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">
              £{price}
            </span>
            <span className="text-gray-600">
              {billingCycle === 'monthly' ? '/month' : 'per session'}
            </span>
          </div>
        </div>

        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-0 mt-8">
        <Button
          onClick={onSelect}
          className={cn(
            'w-full',
            isFeatured
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-secondary hover:bg-secondary/90'
          )}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  )
}
