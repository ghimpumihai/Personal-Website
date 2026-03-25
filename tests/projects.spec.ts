import { test, expect } from '@playwright/test';

test.describe('Projects Routing & Detail Pages', () => {
  test('Homepage has clickable project card links to all 3 detail pages', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('a[href="/projects/healthcheck"]')).toBeVisible();
    await expect(page.locator('a[href="/projects/seebump"]')).toBeVisible();
    await expect(page.locator('a[href="/projects/skywind"]')).toBeVisible();
  });

  test('/projects/healthcheck renders expected content', async ({ page }) => {
    await page.goto('/projects/healthcheck');

    await expect(page.getByRole('heading', { level: 1, name: 'HealthCheck' })).toBeVisible();
    await expect(page.getByText('Solves delayed outage detection', { exact: false })).toBeVisible();
    await expect(page.getByText('C#', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('.NET 8+', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Source Code' })).toHaveAttribute(
      'href',
      'https://github.com/ghimpumihai/HealthCheck'
    );
    await expect(page.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/');
  });

  test('/projects/seebump renders expected content', async ({ page }) => {
    await page.goto('/projects/seebump');

    await expect(page.getByRole('heading', { level: 1, name: 'SeeBump' })).toBeVisible();
    await expect(page.getByText('Addresses aggressive driving', { exact: false })).toBeVisible();
    await expect(page.getByText('OpenCV', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Source Code' })).toHaveAttribute(
      'href',
      'https://github.com/ghimpumihai/PoliHack2025'
    );
    await expect(page.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/');
  });

  test('/projects/skywind renders expected content including links', async ({ page }) => {
    await page.goto('/projects/skywind');

    await expect(page.getByRole('heading', { level: 1, name: 'SkyWind' })).toBeVisible();
    await expect(page.getByText('Identifies optimal wind farm locations', { exact: false })).toBeVisible();
    await expect(page.getByText('Django', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'View Source Code' })).toHaveAttribute(
      'href',
      'https://github.com/bbeatricecretu/RoSpin'
    );
    await expect(page.getByRole('link', { name: 'Back to Projects' })).toHaveAttribute('href', '/');
  });

  test('/projects/skywind renders a youtube iframe embed', async ({ page }) => {
    await page.goto('/projects/skywind');

    const youtubeIframe = page.locator('iframe[src*="youtube"]');
    await expect(youtubeIframe.first()).toBeVisible({ timeout: 15000 });
    await expect(youtubeIframe.first()).toHaveAttribute('src', /youtube/i);
  });

  test('/projects/nonexistent shows 404 behavior', async ({ page }) => {
    const response = await page.goto('/projects/nonexistent');

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'This page could not be found.' })).toBeVisible();
  });

  test('Header Projects link from subpage navigates to /#projects', async ({ page }) => {
    await page.goto('/projects/skywind');

    const projectsHeaderLink = page.locator('nav[aria-label="Global"] a', { hasText: 'Projects' });
    await projectsHeaderLink.click();

    await expect(page).toHaveURL('/#projects');
    await expect(page.locator('#projects')).toBeVisible();
  });

  test('Header logo from subpage navigates to /', async ({ page }) => {
    await page.goto('/projects/skywind');

    await page.getByRole('link', { name: 'Portfolio' }).first().click();
    await expect(page).toHaveURL('/');
  });

  test('Back to Projects works across all detail pages', async ({ page }) => {
    const slugs = ['healthcheck', 'seebump', 'skywind'];

    for (const slug of slugs) {
      await page.goto(`/projects/${slug}`);
      await page.getByRole('link', { name: 'Back to Projects' }).click();

      await expect(page).toHaveURL('/');
      await expect(page.locator('#projects')).toBeVisible();
    }
  });
});
