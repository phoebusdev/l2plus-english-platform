/**
 * CEFR Level Color System
 * Provides consistent color schemes for CEFR level badges and indicators across the app
 */

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export const cefrColors = {
  A1: {
    bg: 'bg-green-100',
    border: 'border-green-500',
    text: 'text-green-700',
    badge: 'bg-green-500 text-white',
    hover: 'hover:bg-green-200',
    name: 'Beginner',
  },
  A2: {
    bg: 'bg-blue-100',
    border: 'border-blue-500',
    text: 'text-blue-700',
    badge: 'bg-blue-500 text-white',
    hover: 'hover:bg-blue-200',
    name: 'Elementary',
  },
  B1: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-500',
    text: 'text-yellow-700',
    badge: 'bg-yellow-500 text-white',
    hover: 'hover:bg-yellow-200',
    name: 'Intermediate',
  },
  B2: {
    bg: 'bg-orange-100',
    border: 'border-orange-500',
    text: 'text-orange-700',
    badge: 'bg-orange-500 text-white',
    hover: 'hover:bg-orange-200',
    name: 'Upper Intermediate',
  },
  C1: {
    bg: 'bg-purple-100',
    border: 'border-purple-500',
    text: 'text-purple-700',
    badge: 'bg-purple-500 text-white',
    hover: 'hover:bg-purple-200',
    name: 'Advanced',
  },
  C2: {
    bg: 'bg-red-100',
    border: 'border-red-500',
    text: 'text-red-700',
    badge: 'bg-red-500 text-white',
    hover: 'hover:bg-red-200',
    name: 'Proficient',
  },
} as const

/**
 * Get color scheme for a CEFR level
 * @param level - CEFR level (A1, A2, B1, B2, C1, C2)
 * @returns Color scheme object with bg, border, text, and badge classes
 */
export function getCEFRColors(level: CEFRLevel) {
  return cefrColors[level]
}

/**
 * Get all CEFR levels in order
 */
export const cefrLevels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

/**
 * Get CEFR level description
 */
export function getCEFRDescription(level: CEFRLevel): string {
  const descriptions = {
    A1: 'Can understand and use familiar everyday expressions and very basic phrases.',
    A2: 'Can understand sentences and frequently used expressions related to areas of immediate relevance.',
    B1: 'Can deal with most situations likely to arise while traveling. Can produce simple connected text.',
    B2: 'Can interact with a degree of fluency and spontaneity. Can produce clear, detailed text.',
    C1: 'Can express ideas fluently and spontaneously. Can produce clear, well-structured, detailed text.',
    C2: 'Can understand with ease virtually everything. Can express themselves spontaneously and precisely.',
  }
  return descriptions[level]
}
