import { test, expect } from '@playwright/test'

test.describe('Registration Flow', () => {
  test('should complete registration successfully', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')

    // Click "Get Started" button
    await page.click('text=Get Started')

    // Fill registration form
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`)
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.fill('input[name="fullName"]', 'Test User')
    await page.fill('input[name="phone"]', '+441234567890')
    await page.selectOption('select[name="timezone"]', 'Europe/London')
    await page.selectOption('select[name="selfReportedLevel"]', 'B1')

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/)

    // Check confirmation email was logged
    // (This would require database access or API check in real implementation)
  })

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/register')

    // Try to submit with invalid email
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="password"]', 'short')
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=/invalid email/i')).toBeVisible()
    await expect(page.locator('text=/password.*8 characters/i')).toBeVisible()
  })
})
