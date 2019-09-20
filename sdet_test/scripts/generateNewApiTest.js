const prompt = require('prompt');
const fs = require('fs');
const path = require('path');

prompt.start();

prompt.get({
  properties: {
    page_location: {
      description: 'Enter folder name of your test? (enter page name with this example: backoffice, frontoffice)',
      required: true,
    },
    page_name: {
      description: 'Enter page object file name for your test: (enter file name with snake_case ex: order_tracking_detail, operation)',
      required: true,
    },
  },
},
(err, result) => {
  if (err) {
    throw err;
  }

  let ableChangeToCamel = false;

  function camelCased(input) {
    let camelCase = '';
    if (input.includes('_')) {
      camelCase = input.replace(/_([a-z])/g, g => g[1].toUpperCase());
      camelCase = camelCase.replace(camelCase[0], camelCase[0].toUpperCase());
      ableChangeToCamel = true;
    } else if (input.includes('-')) {
      camelCase = input.replace(/-([a-z])/g, g => g[1].toUpperCase());
      camelCase = camelCase.replace(camelCase[0], camelCase[0].toUpperCase());
      ableChangeToCamel = true;
    } else {
      camelCase = input;
      camelCase = camelCase.replace(camelCase[0], camelCase[0].toUpperCase());
    }
    return camelCase;
  }

  console.log('---------------------------------------------------------------');
  console.log('The following test file will be created:');
  console.log(`Page object file location: purchase-order/sdet_test/tests/page-object/${result.page_location}/`);
  console.log(`Page object file with name: ${result.page_name}.js`);
  console.log(`Test case file location: purchase-order/sdet_test/tests/api/${result.page_location}/`);
  console.log(`Test case file with name: ${result.page_name}_test.js`);
  console.log('---------------------------------------------------------------');

  // 1. Load page template
  const mochaPagePath = path.join(__dirname, 'Bizzy.Mocha.TemplatePage.template');
  const mochaTestCasePath = path.join(__dirname, 'Bizzy.Mocha.TemplateTestFile.template');
  const mochaTestDataPath = path.join(__dirname, 'Bizzy.Mocha.TestData.template');
  const mochaTestSchemaPath = path.join(__dirname, 'Bizzy.Mocha.TestSchema.template');
  let mochaPageName = fs.readFileSync(mochaPagePath, 'utf8');
  let mochaTestCaseName = fs.readFileSync(mochaTestCasePath, 'utf8');
  const mochaTestDataName = fs.readFileSync(mochaTestDataPath, 'utf8');
  const mochaTestSchemaName = fs.readFileSync(mochaTestSchemaPath, 'utf8');

  // 2. Replace all template with user input
  let isError;
  if (!result.page_name) {
    console.error('Page name cannot be null, ABORTING!');
    isError = true;
  } else if (!result.page_location) {
    console.error('Page location cannot be null, ABORTING!');
    isError = true;
  }

  if (isError) return;

  const pageNameOnPascalCase = camelCased(result.page_name);
  const pageNameOnCamelCase = ableChangeToCamel ? pageNameOnPascalCase.replace(pageNameOnPascalCase[0], pageNameOnPascalCase[0].toLowerCase()) : pageNameOnPascalCase;
  const pageName = result.page_name.includes('-') ? result.page_name.replace('-', '_') : result.page_name;

  mochaPageName = mochaPageName.replace(/__APINAME__/g, pageNameOnPascalCase);
  mochaTestCaseName = mochaTestCaseName.replace(/__APINAME__/g, pageName);
  mochaTestCaseName = mochaTestCaseName.replace(/__APINAMEPASCAL__/g, pageNameOnPascalCase);
  mochaTestCaseName = mochaTestCaseName.replace(/__APINAMECAMEL__/g, pageNameOnCamelCase);
  mochaTestCaseName = mochaTestCaseName.replace(/__APIPAGENAME__/g, result.page_location);

  // Create page-object directory recursively if it doesn't exist!
  const pageObjectRootPath = 'tests/page-objects/api/';
  console.log(`resolving page-object directory for ${result.page_name}`);
  (pageObjectRootPath + result.page_location).split('/').forEach((dir, index, splits) => {
    const curParent = splits.slice(0, index).join('/');
    const dirPath = path.resolve(curParent, dir);
    if (!fs.existsSync(dirPath)) {
      console.log('---------------------------------------------------------------');
      console.log(`creating ${dirPath} directory`);
      fs.mkdirSync(dirPath);
      console.log(`${dirPath} directory CREATED!!`);
      console.log('---------------------------------------------------------------');
    }
  });

  // Create test directory recursively if it doesn't exist!
  const testRootPath = 'tests/api/';
  console.log(`resolving test directory for ${result.page_name}`);
  (testRootPath + result.page_location).split('/').forEach((dir, index, splits) => {
    const curParent = splits.slice(0, index).join('/');
    const dirPath = path.resolve(curParent, dir);
    if (!fs.existsSync(dirPath)) {
      console.log('---------------------------------------------------------------');
      console.log(`creating ${dirPath} directory`);
      fs.mkdirSync(dirPath);
      console.log(`${dirPath} directory CREATED!!`);
      console.log('---------------------------------------------------------------');
    }
  });

  // Create test-data directory recursively if it doesn't exist!
  const testDataRootPath = 'tests/helper/';
  console.log(`resolving test-data directory for ${result.page_name}`);
  (testDataRootPath + result.page_location).split('/').forEach((dir, index, splits) => {
    const curParent = splits.slice(0, index).join('/');
    const dirPath = path.resolve(curParent, dir);
    if (!fs.existsSync(dirPath)) {
      console.log('---------------------------------------------------------------');
      console.log(`creating ${dirPath} directory`);
      fs.mkdirSync(dirPath);
      console.log(`${dirPath} directory CREATED!!`);
      console.log('---------------------------------------------------------------');
    }
  });

  // Create test-schema directory recursively if it doesn't exist!
  const testSchemaRootPath = 'tests/helper/schema/';
  console.log(`resolving test-data directory for ${result.page_name}`);
  (testSchemaRootPath).split('/').forEach((dir, index, splits) => {
    const curParent = splits.slice(0, index).join('/');
    const dirPath = path.resolve(curParent, dir);
    if (!fs.existsSync(dirPath)) {
      console.log('---------------------------------------------------------------');
      console.log(`creating ${dirPath} directory`);
      fs.mkdirSync(dirPath);
      console.log(`${dirPath} directory CREATED!!`);
      console.log('---------------------------------------------------------------');
    }
  });

  // 3. Save file to the proper location
  // 3.1 Save Page Object file
  const pageObjectPath = `${pageObjectRootPath}${result.page_location}/${pageName}.js`;
  console.log(`page-object file will be created under this directory ${pageObjectPath}`);
  fs.writeFile(pageObjectPath, mochaPageName, (errCreatePageObjectFile) => {
    if (errCreatePageObjectFile) {
      throw errCreatePageObjectFile;
    } else {
      console.log(`Page object for mocha file created in ${pageObjectPath}`);
    }
  });

  // 3.2 Save Test file
  const testCasePath = `${testRootPath}${result.page_location}/${pageName}_test.js`;
  console.log(`test file will be created under this directory ${testCasePath}`);
  fs.writeFile(testCasePath, mochaTestCaseName, (errCreateTestCaseFile) => {
    if (errCreateTestCaseFile) {
      throw errCreateTestCaseFile;
    } else {
      console.log(`Test case for mocha file created in: ${testCasePath}`);
      console.log(`Test case for mocha file created in with file name:${testCasePath}`);
    }
  });

  // 3.3 Save Test Data file
  const testDataPath = `${testDataRootPath}${result.page_location}/${pageName}_data.json`;
  console.log(`test-data file will be created under this directory ${testDataPath}`);
  fs.writeFile(testDataPath, mochaTestDataName, (errCreateTestDataFile) => {
    if (errCreateTestDataFile) {
      throw errCreateTestDataFile;
    } else {
      console.log(`Test data for mocha file created in: ${testDataPath}`);
      console.log(`Test data for mocha file created in with file name:${testDataPath}`);
    }
  });

  // 3.3 Save Schema file
  const testSchemaPath = `${testSchemaRootPath}/${pageName}_schema.json`;
  console.log(`test schema file will be created under this directory ${testSchemaPath}`);
  fs.writeFile(testSchemaPath, mochaTestSchemaName, (errCreateTestSchemaFile) => {
    if (errCreateTestSchemaFile) {
      throw errCreateTestSchemaFile;
    } else {
      console.log(`Test assertion schema for mocha file created in: ${testSchemaPath}`);
      console.log(`Test assertion schema for mocha file created in with file name:${testSchemaPath}`);
    }
  });
});
