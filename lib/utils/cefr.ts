export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

/**
 * Calculate CEFR level based on test percentage score
 * Uses percentage bands defined in specification
 */
export function calculateCEFRLevel(percentage: number): CEFRLevel {
  if (percentage < 0 || percentage > 100) {
    throw new Error('Percentage must be between 0 and 100')
  }

  if (percentage <= 33) return 'A1' // 0-33%: Beginner
  if (percentage <= 50) return 'A2' // 34-50%: Elementary
  if (percentage <= 66) return 'B1' // 51-66%: Intermediate
  if (percentage <= 83) return 'B2' // 67-83%: Upper Intermediate
  if (percentage <= 91) return 'C1' // 84-91%: Advanced
  return 'C2' // 92-100%: Proficient
}

/**
 * Get human-readable description of CEFR level
 */
export function getCEFRDescription(level: CEFRLevel): string {
  const descriptions: Record<CEFRLevel, string> = {
    A1: 'Beginner',
    A2: 'Elementary',
    B1: 'Intermediate',
    B2: 'Upper Intermediate',
    C1: 'Advanced',
    C2: 'Proficient',
  }
  return descriptions[level]
}

/**
 * Get all CEFR levels in order
 */
export function getAllCEFRLevels(): CEFRLevel[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
}
