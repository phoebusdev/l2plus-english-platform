import { z } from 'zod'

export const submitTestSchema = z.object({
  testId: z.string().uuid('Invalid test ID'),
  answers: z
    .array(
      z.object({
        questionId: z.number().int().min(1).max(20),
        selectedAnswer: z.enum(['A', 'B', 'C', 'D']),
      })
    )
    .length(20, 'Test must have exactly 20 answers'),
})

export type SubmitTestInput = z.infer<typeof submitTestSchema>
