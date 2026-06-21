const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "Playwright BDD",
    "Browser": "Chromium",
    "Platform": process.platform
  }
};

reporter.generate(options);
console.log('Report generated at reports/cucumber_report.html');
