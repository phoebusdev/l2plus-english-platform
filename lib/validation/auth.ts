import { z } from 'zod'

// Password must be at least 8 characters with uppercase, lowercase, and number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

// UK phone number format (flexible)
const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/

export const registerUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(255),
  phone: z.string().regex(phoneRegex, 'Invalid phone number format'),
  timezone: z.string().min(1, 'Timezone is required'),
  selfReportedLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const resetPasswordRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      passwordRegex,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
})

export type RegisterUserInput = z.infer<typeof registerUserSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
