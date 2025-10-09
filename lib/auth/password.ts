import { hash, verify } from '@node-rs/argon2'

/**
 * Hash a password using Argon2id with secure parameters
 * Memory-hard algorithm resistant to GPU/ASIC attacks (2025 threat model)
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456, // 19 MiB
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  })
}

/**
 * Verify a password against its hash
 */
export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await verify(hash, password)
  } catch {
    return false
  }
}
