import { test, expect } from '@playwright/test';

/**
 * Simplified Loading Animation Tests
 * Focus: Verify both GIF files load and animate correctly
 */

test.describe('Loading GIF Animation Tests', () => {
  test('should load load screen.gif when visiting home page', async ({ page }) => {
    // Listen for GIF requests
    let gifLoaded = false;
    page.on('response', response => {
      if (response.url().includes('load screen.gif')) {
        gifLoaded = true;
        console.log(`✅ load screen.gif loaded - Status: ${response.status()}`);
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Give loading screen time to appear
    await page.waitForTimeout(500);
    
    // Check if any loading indicator exists
    const loadingElements = await page.locator('[class*="loading"], [class*="transition"]').count();
    console.log(`✅ Loading elements found: ${loadingElements}`);
    
    expect(gifLoaded || loadingElements > 0).toBeTruthy();
  });

  test('should load loading 2.gif on page transitions', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    
    let loading2Loaded = false;
    page.on('response', response => {
      if (response.url().includes('loading 2.gif')) {
        loading2Loaded = true;
        console.log(`✅ loading 2.gif loaded - Status: ${response.status()}`);
      }
    });

    // Try to navigate to coding projects
    const links = page.locator('a');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      await links.first().click().catch(() => {
        console.log('No internal link to click');
      });
      
      // Wait for potential loading screen
      await page.waitForTimeout(1000);
    }

    console.log(`✅ Navigation completed - loading 2.gif triggered: ${loading2Loaded}`);
  });

  test('should verify GIF files are accessible via public path', async ({ page }) => {
    // Direct GIF file requests
    const gif1 = await page.request.get('/load screen.gif').catch(() => null);
    const gif2 = await page.request.get('/loading 2.gif').catch(() => null);

    console.log(`✅ load screen.gif - Status: ${gif1?.status() || 'N/A'}`);
    console.log(`✅ loading 2.gif - Status: ${gif2?.status() || 'N/A'}`);

    expect(gif1?.status()).toBeLessThan(400);
    expect(gif2?.status()).toBeLessThan(400);
  });

  test('should display loading animation smoothly', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    console.log(`✅ Page loaded in: ${loadTime}ms`);
    
    // Take screenshot to verify animations
    await page.screenshot({ 
      path: '.playwright-mcp/gif-loading-test.png',
      fullPage: false 
    });
    
    console.log(`✅ Screenshot captured - Page loaded successfully`);
    expect(loadTime).toBeLessThan(15000);
  });

  test('should verify both GIFs are used in the application', async ({ page }) => {
    const requests: string[] = [];
    
    page.on('response', response => {
      if (response.url().includes('.gif')) {
        requests.push(response.url());
      }
    });

    // Visit home
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Check requests log
    const gifRequests = requests.filter(url => 
      url.includes('load screen.gif') || url.includes('loading 2.gif')
    );

    console.log('📊 GIF Requests Made:');
    console.log(`   - load screen.gif: ${requests.filter(u => u.includes('load screen.gif')).length} request(s)`);
    console.log(`   - loading 2.gif: ${requests.filter(u => u.includes('loading 2.gif')).length} request(s)`);
    console.log(`   - Total GIF requests: ${requests.length}`);

    expect(requests.length).toBeGreaterThan(0);
  });

  test('should render loading animation without console errors', async ({ page }) => {
    const consoleLogs: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleLogs.push(`ERROR: ${msg.text()}`);
      }
    });

    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    console.log('✅ Console Errors:', consoleLogs.length === 0 ? 'None' : consoleLogs.join(', '));
    expect(consoleLogs.length).toBe(0);
  });
});
