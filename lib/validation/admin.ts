import { z } from 'zod'

export const updateStudentLevelSchema = z.object({
  assignedCefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
})

export const updateHomepageContentSchema = z.object({
  headline: z.string().max(255).optional(),
  subtext: z.string().optional(),
  step1Text: z.string().optional(),
  step2Text: z.string().optional(),
  step3Text: z.string().optional(),
  ctaText: z.string().max(100).optional(),
})

export const updateAboutUsContentSchema = z.object({
  contentHtml: z.string().optional(),
  instructorPhotos: z
    .array(
      z.object({
        name: z.string(),
        photoUrl: z.string(),
        bio: z.string(),
      })
    )
    .optional(),
})

export const updatePricingPlanSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  priceGbp: z.number().int().positive().optional(),
  features: z.array(z.string()).optional(),
})

export const updateTestQuestionsSchema = z.object({
  questions: z
    .array(
      z.object({
        id: z.number().int().min(1).max(20),
        question: z.string(),
        options: z.object({
          A: z.string(),
          B: z.string(),
          C: z.string(),
          D: z.string(),
        }),
        correctAnswer: z.enum(['A', 'B', 'C', 'D']),
        difficulty: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
      })
    )
    .length(20, 'Test must have exactly 20 questions'),
})

export type UpdateStudentLevelInput = z.infer<typeof updateStudentLevelSchema>
export type UpdateHomepageContentInput = z.infer<typeof updateHomepageContentSchema>
export type UpdateAboutUsContentInput = z.infer<typeof updateAboutUsContentSchema>
export type UpdatePricingPlanInput = z.infer<typeof updatePricingPlanSchema>
export type UpdateTestQuestionsInput = z.infer<typeof updateTestQuestionsSchema>
