import { test, expect } from '@playwright/test';

test.describe('Portfolio Flow Test - Performance & Glitches', () => {
  test('Check Initial Load Performance', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    const loadTime = Date.now() - startTime;
    console.log(`Page Load Time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(8000);
  });

  test('Test Smooth Scrolling Flow', async ({ page }) => {
    await page.goto('/');
    const sections = ['#home', '#about', '#works', '#pricing', '#contact'];
    for (const section of sections) {
      const element = await page.locator(section).first();
      if (await element.isVisible({ timeout: 1000 }).catch(() => false)) {
        await element.scrollIntoViewIfNeeded();
        console.log(`Scrolled to: ${section}`);
      }
    }
  });

  test('Test Mobile Responsiveness', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
s  });
});
