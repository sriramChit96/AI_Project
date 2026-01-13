# AI Project

Advanced Playwright automation testing framework with support for:
- Web application testing
- Excel data-driven testing
- Multi-browser testing (Chrome, Firefox, Safari)
- API testing
- Detailed HTML reports

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run in UI mode (interactive)
```bash
npm run test:ui
```

### Run with visible browser
```bash
npm run test:headed
```

### Run specific browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Run specific test file
```bash
npm test -- tests/sample.spec.js
```

### View test report
```bash
npm run report
```

## Project Structure

```
AI_Project/
├── tests/
│   ├── sample.spec.js
│   └── readExcelURL.spec.js
├── testdata/
│   └── urls.xlsx (create this file)
├── playwright.config.js
├── package.json
└── README.md
```

## Features

### Sample Tests
- Navigate to websites
- Verify page titles
- Screenshot on failure

### Excel URL Navigation
- Read URLs from Excel Sheet1
- Navigate to each URL
- Capture page titles
- Print results to console

## Requirements

- Node.js 14+
- npm or yarn

## Dependencies

- @playwright/test - Testing framework
- exceljs - Excel file manipulation
- playwright - Browser automation

## License

ISC
