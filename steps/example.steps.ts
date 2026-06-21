import { chromium, Browser, Page} from 'playwright';
import { AfterAll, BeforeAll, Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import assert from 'assert';
import {expect} from '@playwright/test';

let browser: Browser;
let page: Page;

setDefaultTimeout(30_000);

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true });
  // browser = await chromium.launch({executablePath: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  // headless: true });
  page = await browser.newPage();
});

Given('I open the Login Shop page', async () => {
  console.log('I open the Login - Shop homepage');
  await page.goto('https://qa-practice.razvanvancea.ro/auth_ecommerce.html');
});

Then('I attempt to login with email {string} and password {string}', async (email: string, password: string) => {
//   console.log(`Attempting to login with email: ${email} and password: ${password}`);
  // Add your login logic here
  console.log(`Attempting to login with email: ${email} and password: ${password}`);
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.click('#submitLoginBtn');
  //  await page.waitForTimeout(1000);
});

Then('I should see a login error message', async function () {
  console.log('Checking for login error message');
  await page.waitForSelector('#message');
  const messageText = await page.textContent('#message');
  console.log(`Login error message: ${messageText}`);
  assert.ok(messageText?.includes('Bad credentials'), `Expected error message, got: ${messageText}`);
});

Then('I should see login success', async function () {
  console.log('Checking for successful login');
  await page.waitForSelector('#prooood', { state: 'visible' });
  const cartSectionVisible = await page.isVisible('#prooood');
  assert.ok(cartSectionVisible, 'Expected shopping cart section to be visible after successful login');
});

Given('Select Items correctly by following', async function () {
  console.log('Select Items correctly by following');
  await expect(page.getByText('SHOPPING CART')).toBeVisible();
});

Then('When Select {string} for {int} units to Cart', async function (item: string, units: number) {
  console.log(`Selecting item: ${item} for ${units} units to Cart`);
  const addToCartButton =  this.page.locator('.shop-item').filter({hasText: "${item}"}).getByRole('button', {name: 'ADD TO CART'}).click();
  for (let i = 0; i < units; i++) {
    await addToCartButton.click();
  }
});

Then('Cart should display {string} for {string} units', async function (item: string, units: number) {
  console.log(`Verifying cart displays item: ${item} for ${units} units`);
  await page.locator('.shop-item').filter({hasText: "${item}"}).getByRole('button', {name: 'ADD TO CART'}).click();
  await page.locator('.cart-row').filter({hasText:"${item}"}).locator('.cart-quantity-input').fill(units.toString());
  await expect(page.locator('.cart-row').filter({hasText:"${item}"})).toHaveValue(units.toString());
});

Then('Calculate The total cost by using price x quality', async function () {
  console.log('Calculating the total cost by using price x quantity');
  
  const rows = page.locator('.cart-row');
  let total = 0;

  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    total +=
      Number((await row.locator('.cart-price').textContent())?.replace('$', '')) *
      Number(await row.locator('.cart-quantity-input').inputValue());
  }

  console.log(total.toFixed(2));
  await expect(page.locator('.cart-total-price')).toHaveText(total.toFixed(2).toString());

});

Then('Calculate The total cost by using price x quality', async function () {
  console.log('Calculating the total cost by using price x quantity');
  const rows = page.locator('.cart-row');
  let total = 0;
  for (let i = 0; i < await rows.count(); i++) {
    const row = rows.nth(i);
    total +=
      Number((await row.locator('.cart-price').textContent())?.replace('$', '')) *
      Number(await row.locator('.cart-quantity-input').inputValue());
  }

  // console.log(total.toFixed(2));
  await expect(page.locator('.cart-total-price')).toHaveText(total.toFixed(2).toString());
});

Then('Click checkout button', async function () {
  console.log('Clicking the checkout button');
  await page.locator('.btn-purchase').click();
});

Then('Display Shopping Details page', async function () {
  console.log('Verifying the Shopping Details page is displayed');
   await expect(page.getByText('Shipping Details')).toBeVisible();
});
Then('Enter blank value to all fields', async function () {
  console.log('Entering blank values to all fields');
  await page.locator('#phone').fill('');
  await page.locator('#street').fill('');
  await page.locator('#city').fill('');
  await page.locator('#countries_dropdown_menu').selectOption('');
  await page.locator('#submitOrderBtn').click();
});
Then('Should see inline error message', async function () {
  console.log('Verifying inline error messages are displayed for blank fields');

});
Then('Enter valid value to all fields', async function () {
  console.log('Entering valid values to all fields');
  
});
Then(' Should not see inline error message', async function () {
  console.log('Verifying no inline error messages are displayed for valid fields');
    await page.locator('#phone').fill('0123456789');
  await page.locator('#street').fill('100');
  await page.locator('#city').fill('Bangkok');
  await page.locator('#countries_dropdown_menu').selectOption('Thailand');
  await page.locator('#submitOrderBtn').click();
});
Then('Should see Submit Order button is enabled', async function () {
  console.log('Verifying the Submit Order button is enabled');
  
  await expect(page.locator('#message')).toContainText('100, Bangkok - Thailand.');

});


AfterAll(async () => {
  await page.waitForTimeout(5000);
  await page.close();
  await browser.close();
});
