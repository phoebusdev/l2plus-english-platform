import { CEFRLevel, getCEFRColors } from '@/lib/constants/cefr-colors'
import { cn } from '@/lib/utils'

interface CEFRBadgeProps {
  level: CEFRLevel
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function CEFRBadge({
  level,
  showLabel = true,
  size = 'md',
  className
}: CEFRBadgeProps) {
  const colors = getCEFRColors(level)

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-semibold',
        colors.badge,
        sizeClasses[size],
        className
      )}
    >
      <span>{level}</span>
      {showLabel && <span className="font-normal">{colors.name}</span>}
    </span>
  )
}
