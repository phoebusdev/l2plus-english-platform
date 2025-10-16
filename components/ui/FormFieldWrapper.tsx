import { ReactNode } from 'react'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface FormFieldWrapperProps {
  label: string
  htmlFor: string
  error?: string
  helperText?: string
  required?: boolean
  children: ReactNode
  className?: string
}

export function FormFieldWrapper({
  label,
  htmlFor,
  error,
  helperText,
  required = false,
  children,
  className
}: FormFieldWrapperProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>

      {children}

      {error && (
        <p className="text-sm text-destructive flex items-center gap-1">
          <span className="font-medium">Error:</span> {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-xs text-muted-foreground">
          {helperText}
        </p>
      )}
    </div>
  )
}
