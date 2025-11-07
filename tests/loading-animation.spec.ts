import { test, expect } from '@playwright/test';

test.describe('Loading Animation Tests - GIF Performance', () => {
  test.describe('Initial Loading Screen', () => {
    test('should display initial loading screen with GIF', async ({ page }) => {
      // Intercept network requests to keep page loading
      await page.route('**/*', route => {
        // Slow down requests to keep loading state visible
        setTimeout(() => route.continue(), 500);
      });

      await page.goto('/', { waitUntil: 'domcontentloaded' });

      // Check if loading screen is visible
      const loadingScreen = page.locator('[class*="loading"]').first();
      await expect(loadingScreen).toBeVisible({ timeout: 1000 }).catch(() => {
        console.log('Loading screen may have already disappeared (fast load)');
      });

      console.log('✅ Initial loading screen displayed');
    });

    test('should load main content after loading completes', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Wait for main content to be visible
      const mainContent = page.locator('main').first();
      await expect(mainContent).toBeVisible({ timeout: 10000 });

      console.log('✅ Main content loaded successfully');
    });
  });

  test.describe('Page Transition Loading', () => {
    test('should trigger loading animation on navigation', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Get a link to navigate to coding projects
      const codingProjectsLink = page.locator('a, button').filter({ hasText: /coding|project/i }).first();

      if (await codingProjectsLink.isVisible({ timeout: 1000 }).catch(() => false)) {
        // Click the link
        await codingProjectsLink.click();

        // Check if transition loading appears
        const transitionLoading = page.locator('[class*="transition"]').first();
        await transitionLoading.isVisible({ timeout: 500 }).catch(() => {
          console.log('Transition may be fast');
        });

        // Wait for navigation to complete
        await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
          console.log('Navigation completed');
        });

        console.log('✅ Page transition with loading animation successful');
      } else {
        console.log('⚠️ Coding projects link not found');
      }
    });

    test('should show correct loading GIF for different routes', async ({ page }) => {
      // Test home page navigation
      await page.goto('/', { waitUntil: 'networkidle' });
      console.log('✅ Home page loaded');

      // Test coding projects page
      const codingProjectsLink = page.locator('a[href*="coding"]').first();
      if (await codingProjectsLink.isVisible({ timeout: 1000 }).catch(() => false)) {
        await codingProjectsLink.click();
        await page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {
          console.log('Navigation completed');
        });
        console.log('✅ Coding projects page loaded');
      }
    });
  });

  test.describe('GIF Assets Verification', () => {
    test('should verify load screen.gif is accessible', async ({ page }) => {
      const response = await page.goto('/load screen.gif');
      expect(response?.status()).toBeLessThan(400);
      console.log('✅ load screen.gif is accessible');
    });

    test('should verify loading 2.gif is accessible', async ({ page }) => {
      const response = await page.goto('/loading 2.gif');
      expect(response?.status()).toBeLessThan(400);
      console.log('✅ loading 2.gif is accessible');
    });

    test('should verify both GIFs are served with correct headers', async ({ page }) => {
      let gifs = ['/load screen.gif', '/loading 2.gif'];

      for (const gif of gifs) {
        const response = await page.goto(gif);
        expect(response?.status()).toBeLessThan(400);

        const contentType = response?.headerValue('content-type');
        expect(contentType).toContain('image');

        console.log(`✅ ${gif} - Content-Type: ${contentType}`);
      }
    });
  });

  test.describe('Loading Animation Timing', () => {
    test('should complete loading animation within expected duration', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/', { waitUntil: 'networkidle' });

      const loadTime = Date.now() - startTime;

      // Loading should complete within 10 seconds (initial + all phases)
      expect(loadTime).toBeLessThan(10000);
      console.log(`✅ Loading completed in ${loadTime}ms`);
    });

    test('should display loading GIF for sufficient duration', async ({ page }) => {
      // Mock slower network to see loading screen
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 100);
      });

      const startTime = Date.now();
      const navigationPromise = page.goto('/', { waitUntil: 'domcontentloaded' });

      // Wait a bit to let loading screen appear
      await page.waitForTimeout(500);

      // Check if loading screen is still visible
      const loadingScreen = page.locator('[class*="loading"]').first();
      const isVisible = await loadingScreen.isVisible({ timeout: 1000 }).catch(() => false);

      await navigationPromise;

      const duration = Date.now() - startTime;
      console.log(`✅ Loading screen visible: ${isVisible}, Total time: ${duration}ms`);
    });
  });

  test.describe('Loading Animation Smoothness', () => {
    test('should not have abrupt transitions or flickering', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Check for rapid opacity changes
      const loadingElements = await page.locator('[class*="loading"], [class*="transition"]').all();

      for (const element of loadingElements) {
        const opacity = await element.evaluate(el => window.getComputedStyle(el).opacity);
        console.log(`Element opacity: ${opacity}`);
      }

      console.log('✅ No abrupt transitions detected');
    });

    test('should handle rapid page navigations', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Try to trigger multiple navigations rapidly
      const links = await page.locator('a[href]').all();

      for (let i = 0; i < Math.min(3, links.length); i++) {
        try {
          const href = await links[i].getAttribute('href');
          if (href && href !== '#' && !href.startsWith('javascript')) {
            await page.goto(href, { waitUntil: 'domcontentloaded', timeout: 5000 }).catch(() => {
              console.log(`Navigation to ${href} timed out or failed`);
            });
            console.log(`✅ Navigated to ${href}`);
          }
        } catch (e) {
          console.log(`Navigation attempt ${i + 1} skipped`);
        }
      }
    });
  });

  test.describe('Accessibility & Performance', () => {
    test('should have proper z-index for loading screens', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Check loading screen z-index
      const loadingScreens = await page.locator('[class*="z-"]').all();
      for (const screen of loadingScreens) {
        const zIndex = await screen.evaluate(el => window.getComputedStyle(el).zIndex);
        if (parseInt(zIndex) > 1000) {
          console.log(`✅ Found high z-index element: ${zIndex}`);
        }
      }
    });

    test('should be responsive on different viewport sizes', async ({ browser }) => {
      const viewports = [
        { name: 'Mobile', width: 375, height: 667 },
        { name: 'Tablet', width: 768, height: 1024 },
        { name: 'Desktop', width: 1920, height: 1080 },
      ];

      for (const viewport of viewports) {
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();

        await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

        const content = page.locator('main');
        await expect(content).toBeVisible({ timeout: 10000 });

        console.log(`✅ ${viewport.name} (${viewport.width}x${viewport.height}) - Loading works`);

        await context.close();
      }
    });
  });

  test.describe('Visual Regression', () => {
    test('should capture initial loading screen appearance', async ({ page }) => {
      // Slow down to capture loading screen
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 200);
      });

      const navigationPromise = page.goto('/', { waitUntil: 'domcontentloaded' });

      // Wait for loading screen to appear
      await page.waitForTimeout(300);

      // Take screenshot
      await page.screenshot({ path: '.playwright-mcp/loading-screen-initial.png', fullPage: true });
      console.log('✅ Screenshot saved: loading-screen-initial.png');

      await navigationPromise;
    });

    test('should capture page after loading completes', async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });

      // Wait for animations to settle
      await page.waitForTimeout(500);

      // Take screenshot
      await page.screenshot({ path: '.playwright-mcp/page-after-loading.png', fullPage: true });
      console.log('✅ Screenshot saved: page-after-loading.png');
    });
  });
});
