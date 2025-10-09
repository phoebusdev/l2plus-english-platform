import { z } from 'zod'

export const createClassSessionSchema = z.object({
  dateTime: z.string().datetime('Invalid date-time format (ISO 8601 required)'),
  cefrLevel: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  zoomUrl: z.string().url('Invalid Zoom URL').max(500),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
  instructorName: z.string().max(255).optional(),
})

export const updateClassSessionSchema = createClassSessionSchema.partial()

export type CreateClassSessionInput = z.infer<typeof createClassSessionSchema>
export type UpdateClassSessionInput = z.infer<typeof updateClassSessionSchema>
