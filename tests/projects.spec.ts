import { test, expect } from '@playwright/test';

test.describe('Projects Routing & Detail Pages', () => {

  test('Homepage project cards link to correct detail pages', async ({ page }) => {
    await page.goto('/');
    
    // Find the link for SkyWind. We know the URL is /projects/skywind
    const skywindLink = page.locator('a[href="/projects/skywind"]');
    await expect(skywindLink).toBeVisible();
    
    // Click the link and verify URL
    await skywindLink.click();
    await page.waitForURL('**/projects/skywind');
    await expect(page).toHaveURL(/.*\/projects\/skywind/);
  });

  test('Detail page renders title, descriptions, and tags', async ({ page }) => {
    await page.goto('/projects/healthcheck');
    
    // Verify Title
    await expect(page.locator('h1', { hasText: 'HealthCheck' })).toBeVisible();
    
    // Verify tags
    await expect(page.locator('text=C#').first()).toBeVisible();
    await expect(page.locator('text=.NET 8+').first()).toBeVisible();
    
    // Verify Github link
    await expect(page.locator('a', { hasText: 'View Source Code' })).toHaveAttribute('href', 'https://github.com/ghimpumihai/HealthCheck');
  });

  test('Video embed renders correctly for Skywind', async ({ page }) => {
    page.on('console', msg => console.log('Browser Console:', msg.text()));
    page.on('pageerror', err => console.error('Browser PageError:', err.message));

    await page.goto('/projects/skywind');
    
    // Wait for the video wrapper
    const videoWrapper = page.locator('.aspect-video');
    await expect(videoWrapper).toBeVisible();
    
    await page.waitForTimeout(3000); // give it time to load dynamically
    console.log('Inner HTML after 3s:', await videoWrapper.innerHTML());
    const mediaElement = page.locator('.aspect-video iframe, .aspect-video video').first();
    await expect(mediaElement).toBeVisible({ timeout: 10000 });
  });

  test('Back to Projects link routes back to homepage', async ({ page }) => {
    await page.goto('/projects/seebump');
    
    const backLink = page.locator('a', { hasText: 'Back to Projects' });
    await expect(backLink).toBeVisible();
    
    await backLink.click();
    await page.waitForURL('**/');
    // Ensure we are back on the homepage
    await expect(page).toHaveURL(/.*\//);
  });

  test('Navigating to non-existent project returns 404', async ({ page }) => {
    const response = await page.goto('/projects/non-existent-project');
    expect(response?.status()).toBe(404);
  });
});
