import { Card, CardContent } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  iconColor?: string
  className?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconColor = 'text-primary',
  className
}: StatCardProps) {
  return (
    <Card className={cn('shadow-md', className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {label}
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {value}
            </p>
          </div>
          <div className={cn('p-3 rounded-lg bg-gray-100', iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
