const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');

test.describe('Excel URL Navigation Tests', () => {
  
  test('should read URLs from Excel Sheet1 and print page titles', async ({ page }) => {
    console.log('\n📊 Excel URL Navigation Test');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Path to Excel file
    const excelPath = path.join(__dirname, '..', 'testdata', 'urls.xlsx');

    // Check if file exists
    if (!fs.existsSync(excelPath)) {
      console.log('❌ Excel file not found at:', excelPath);
      console.log('ℹ️ Please create testdata/urls.xlsx with URLs in Column A');
      throw new Error(`Excel file not found: ${excelPath}`);
    }

    // Load workbook
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelPath);
    const worksheet = workbook.getWorksheet(1); // Sheet1

    console.log('✓ Excel file loaded');
    console.log(`✓ Sheet name: ${worksheet.name}`);
    console.log(`✓ Total rows: ${worksheet.rowCount}\n`);

    // Extract URLs from Column A
    const urls = [];
    worksheet.eachRow((row, rowNum) => {
      if (rowNum === 1) return; // Skip header
      const url = row.getCell(1).value;
      if (url) {
        urls.push(url);
      }
    });

    console.log(`Found ${urls.length} URLs to process\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Navigate to each URL and get page title
    const results = [];
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      try {
        console.log(`[${i + 1}] URL: ${url}`);
        
        // Navigate to URL
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Get page title
        const pageTitle = await page.title();
        results.push({
          url: url,
          pageTitle: pageTitle,
          status: 'Success'
        });
        
        console.log(`    ✓ Page Title: ${pageTitle}`);
        console.log(`    ✓ Status: Success\n`);

      } catch (error) {
        results.push({
          url: url,
          pageTitle: 'N/A',
          status: `Failed - ${error.message}`
        });
        console.log(`    ✗ Page Title: N/A`);
        console.log(`    ✗ Status: Failed - ${error.message}\n`);
      }
    }

    // Print summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 SUMMARY REPORT');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    results.forEach((result, index) => {
      console.log(`${index + 1}. URL: ${result.url}`);
      console.log(`   Page Title: ${result.pageTitle}`);
      console.log(`   Status: ${result.status}\n`);
    });

    expect(results.length).toBeGreaterThan(0);
  });
});
