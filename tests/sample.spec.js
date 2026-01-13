const { test, expect } = require('@playwright/test');

test.describe('Sample Tests', () => {
  test('should navigate to Google', async ({ page }) => {
    await page.goto('https://www.google.com');
    const title = await page.title();
    console.log('Page Title:', title);
    expect(title).toContain('Google');
  });

  test('should navigate to GitHub', async ({ page }) => {
    await page.goto('https://www.github.com');
    const title = await page.title();
    console.log('Page Title:', title);
    expect(title).toBeTruthy();
  });
});
