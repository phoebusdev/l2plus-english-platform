import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-inter',
          'shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]',
          'transition-all duration-200 ease-out',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:border-primary',
          'focus-visible:ring-2 focus-visible:ring-primary/20',
          'focus-visible:shadow-[0_0_0_3px_rgba(230,57,70,0.1),inset_0_1px_2px_rgba(0,0,0,0.2)]',
          'hover:border-gray-600 focus-visible:hover:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
