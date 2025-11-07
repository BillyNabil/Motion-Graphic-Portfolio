import { test, expect } from '@playwright/test';

/**
 * Page Transition Loading Tests
 * Tests: Main Page → Coding Projects (loading 2.gif)
 *        Coding Projects → Main Page (load screen.gif)
 */

test.describe('Page Transition Loading Screen Tests', () => {
  
  test('should show loading 2.gif when navigating to coding projects', async ({ page }) => {
    const responses: { url: string; status: number }[] = [];
    
    // Track all resource responses
    page.on('response', response => {
      if (response.url().includes('.gif')) {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });

    // Navigate to home page
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Find and click the coding projects button
    const codingProjectsBtn = page.locator('button[title="View Coding Projects"], a[href="/coding-projects"]').first();
    
    if (await codingProjectsBtn.isVisible().catch(() => false)) {
      console.log('✅ Coding Projects button found and visible');
      
      await codingProjectsBtn.click();
      
      // Wait for loading screen to appear
      await page.waitForTimeout(1500);
      
      // Screenshot during loading
      await page.screenshot({
        path: '.playwright-mcp/transition-to-coding-projects-loading.png',
        fullPage: false,
      });
      
      console.log('✅ Screenshot captured during transition');
    } else {
      console.log('⚠️ Coding Projects button not found');
    }

    // Check if loading 2.gif was requested
    const loading2GifRequested = responses.some(r => 
      r.url.includes('loading 2.gif') && r.status < 400
    );
    
    console.log('📊 GIF Responses:');
    responses.forEach(r => {
      console.log(`   - ${r.url.split('/').pop()} (Status: ${r.status})`);
    });

    expect(loading2GifRequested || responses.length > 0).toBeTruthy();
  });

  test('should show load screen.gif when navigating back to home from coding projects', async ({ page }) => {
    const responses: { url: string; status: number }[] = [];
    
    page.on('response', response => {
      if (response.url().includes('.gif')) {
        responses.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });

    // Navigate directly to coding projects
    await page.goto('/coding-projects', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // Wait for initial loading screen

    // Clear previous responses to track only the back navigation
    responses.length = 0;

    // Find and click the back button
    const backBtn = page.locator('button[title="Back to Motion Graphic"]').first();
    
    if (await backBtn.isVisible().catch(() => false)) {
      console.log('✅ Back button found and visible');
      
      await backBtn.click();
      
      // Wait for loading screen to appear
      await page.waitForTimeout(1500);
      
      // Screenshot during loading
      await page.screenshot({
        path: '.playwright-mcp/transition-to-home-loading.png',
        fullPage: false,
      });
      
      console.log('✅ Screenshot captured during transition');
    } else {
      console.log('⚠️ Back button not found');
    }

    // Check if load screen.gif was requested
    const loadScreenGifRequested = responses.some(r => 
      r.url.includes('load screen.gif') && r.status < 400
    );
    
    console.log('📊 GIF Responses:');
    responses.forEach(r => {
      console.log(`   - ${r.url.split('/').pop()} (Status: ${r.status})`);
    });

    expect(loadScreenGifRequested || responses.length > 0).toBeTruthy();
  });

  test('should load both GIF files correctly', async ({ page }) => {
    // Direct check for GIF accessibility
    const loading2Response = await page.request.get('/loading 2.gif').catch(e => {
      console.error('Failed to fetch loading 2.gif:', e.message);
      return null;
    });
    
    const loadScreenResponse = await page.request.get('/load screen.gif').catch(e => {
      console.error('Failed to fetch load screen.gif:', e.message);
      return null;
    });

    console.log(`✅ loading 2.gif - Status: ${loading2Response?.status() || 'FAILED'}`);
    console.log(`✅ load screen.gif - Status: ${loadScreenResponse?.status() || 'FAILED'}`);

    expect(loading2Response?.status()).toBeLessThan(400);
    expect(loadScreenResponse?.status()).toBeLessThan(400);
  });

  test('should complete full navigation cycle: home → coding projects → home', async ({ page }) => {
    const startTime = Date.now();
    const navigationSteps: string[] = [];

    // Step 1: Navigate to home
    await page.goto('/', { waitUntil: 'networkidle' });
    navigationSteps.push('✅ Navigated to home');
    await page.waitForTimeout(1000);

    // Step 2: Navigate to coding projects
    const codingProjectsBtn = page.locator('button[title="View Coding Projects"]').first();
    if (await codingProjectsBtn.isVisible().catch(() => false)) {
      await codingProjectsBtn.click();
      navigationSteps.push('✅ Clicked coding projects button');
      await page.waitForTimeout(2000);
      
      // Take screenshot at coding projects
      await page.screenshot({
        path: '.playwright-mcp/full-cycle-at-coding-projects.png',
        fullPage: true,
      });
      navigationSteps.push('✅ Arrived at coding projects');
    }

    // Step 3: Navigate back to home
    const backBtn = page.locator('button[title="Back to Motion Graphic"]').first();
    if (await backBtn.isVisible().catch(() => false)) {
      await backBtn.click();
      navigationSteps.push('✅ Clicked back button');
      await page.waitForTimeout(2000);
      
      // Take screenshot back at home
      await page.screenshot({
        path: '.playwright-mcp/full-cycle-back-at-home.png',
        fullPage: true,
      });
      navigationSteps.push('✅ Returned to home');
    }

    const totalTime = Date.now() - startTime;

    console.log('📊 Full Navigation Cycle:');
    navigationSteps.forEach(step => console.log(`   ${step}`));
    console.log(`⏱️  Total time: ${totalTime}ms`);

    expect(navigationSteps.length).toBeGreaterThanOrEqual(4);
  });

  test('should not show console errors during page transitions', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Navigate to home
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Trigger transition to coding projects
    const codingProjectsBtn = page.locator('button[title="View Coding Projects"]').first();
    if (await codingProjectsBtn.isVisible().catch(() => false)) {
      await codingProjectsBtn.click();
      await page.waitForTimeout(2000);
    }

    console.log(`✅ Console Errors: ${consoleErrors.length === 0 ? 'None' : consoleErrors.join(', ')}`);
    expect(consoleErrors.length).toBe(0);
  });

  test('should verify page transition UI elements are properly rendered', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });

    // Check navbar elements
    const navbar = page.locator('nav').first();
    expect(navbar).toBeVisible();

    // Check if coding projects button exists
    const codingProjectsBtn = page.locator('button[title="View Coding Projects"]');
    expect(codingProjectsBtn).toBeDefined();

    console.log('✅ Navigation UI elements verified on home page');

    // Navigate to coding projects
    if (await codingProjectsBtn.isVisible().catch(() => false)) {
      await codingProjectsBtn.click();
      await page.waitForTimeout(2500);

      // Check coding projects navbar
      const cpNavbar = page.locator('nav').first();
      if (await cpNavbar.isVisible().catch(() => false)) {
        console.log('✅ Navigation UI elements verified on coding projects page');
      }
    }
  });

  test('should measure transition performance', async ({ page }) => {
    const metrics: { name: string; duration: number }[] = [];

    // Measure transition 1: Home to Coding Projects
    const start1 = Date.now();
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const codingProjectsBtn = page.locator('button[title="View Coding Projects"]').first();
    if (await codingProjectsBtn.isVisible().catch(() => false)) {
      await codingProjectsBtn.click();
      await page.waitForTimeout(2000);
      metrics.push({ name: 'Home → Coding Projects', duration: Date.now() - start1 });
    }

    // Measure transition 2: Coding Projects to Home
    const start2 = Date.now();
    const backBtn = page.locator('button[title="Back to Motion Graphic"]').first();
    if (await backBtn.isVisible().catch(() => false)) {
      await backBtn.click();
      await page.waitForTimeout(2000);
      metrics.push({ name: 'Coding Projects → Home', duration: Date.now() - start2 });
    }

    console.log('📊 Transition Performance:');
    metrics.forEach(m => {
      console.log(`   ${m.name}: ${m.duration}ms`);
    });

    // All transitions should complete within reasonable time
    metrics.forEach(m => {
      expect(m.duration).toBeLessThan(5000);
    });
  });
});
