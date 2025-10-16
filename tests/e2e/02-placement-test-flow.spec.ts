import { test, expect } from '@playwright/test'

test.describe('Placement Test Flow', () => {
  test('should complete 5-page test successfully', async ({ page }) => {
    // Login as test user
    await page.goto('/login')
    await page.fill('input[name="email"]', 'testuser@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Navigate to test
    await page.goto('/test')

    // Check eligibility
    await expect(page.locator('text=Start Test')).toBeVisible()
    await page.click('text=Start Test')

    // Should be on start page
    await expect(page).toHaveURL(/\/test\/start/)

    // Complete Page 1 (questions 1-5)
    for (let i = 1; i <= 5; i++) {
      await page.click(`text=${i}.`, { position: { x: 0, y: 0 } })
      await page.click('button:has-text("A)")').first()
    }

    // Click Next Page
    await page.click('text=Next Page')

    // Should be on page 2
    await expect(page.locator('text=Page 2 of 5')).toBeVisible()

    // Complete remaining pages (2-4)
    for (let pageNum = 2; pageNum <= 4; pageNum++) {
      // Answer 5 questions
      for (let i = 0; i < 5; i++) {
        await page.click('button:has-text("A)")').nth(i)
      }
      await page.click('text=Next Page')
    }

    // Page 5 - final page
    await expect(page.locator('text=Page 5 of 5')).toBeVisible()

    // Answer final 5 questions
    for (let i = 0; i < 5; i++) {
      await page.click('button:has-text("A)")').nth(i)
    }

    // Submit test
    await page.click('text=Submit Test')

    // Should redirect to results
    await expect(page).toHaveURL(/\/test\/results/)

    // Should show CEFR level badge
    await expect(page.locator('[data-testid="cefr-badge"]')).toBeVisible()

    // Should show score out of 25
    await expect(page.locator('text=/\\/25/')).toBeVisible()
  })

  test('should enforce 7-day retake restriction', async ({ page }) => {
    // Login as user who took test today
    await page.goto('/login')
    await page.fill('input[name="email"]', 'recent-tester@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    // Navigate to test
    await page.goto('/test')

    // Should show restriction message
    await expect(page.locator('text=/Next test available on/i')).toBeVisible()

    // Start Test button should be disabled
    await expect(page.locator('button:has-text("Start Test")')).toBeDisabled()
  })

  test('should not allow back navigation', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="email"]', 'testuser@example.com')
    await page.fill('input[name="password"]', 'TestPassword123!')
    await page.click('button[type="submit"]')

    await page.goto('/test/start')

    // Answer questions on page 1
    for (let i = 0; i < 5; i++) {
      await page.click('button:has-text("A)")').nth(i)
    }

    // Go to page 2
    await page.click('text=Next Page')
    await expect(page.locator('text=Page 2 of 5')).toBeVisible()

    // There should be no "Previous Page" button
    await expect(page.locator('button:has-text("Previous")')).not.toBeVisible()
    await expect(page.locator('button:has-text("Back")')).not.toBeVisible()
  })
})
