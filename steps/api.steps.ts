import { Given, When, Then } from '@cucumber/cucumber';
import { request, APIRequestContext, expect } from '@playwright/test';

let apiContext: APIRequestContext;
let response: any;
let payload: any;
let responseBody: any
let employeeId: number;

Given('I have employee payload', async function () {

const randomText = Array.from({ length: 8 }, () =>
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  [Math.floor(Math.random() * 52)]
).join('');

  payload = {
    id: 11,
    firstName: randomText,
    lastName: randomText,
    dob: '1999-08-20',
    email: `${randomText}@gmail.com`
  };

  apiContext = await request.newContext({
    baseURL: 'http://localhost:8887',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'accept': '*/*'
    }
  });
});

When('I send POST request to create employee', async function () {
  response = await apiContext.post('/api/v1/employees', {
    data: payload
  });
  
});

Then('the response status should be 201', async function () {
    console.log(`Response status:############### ${response.status()}`);
  expect(response.status()).toBe(201);
});

//=========================

Given('I have employee payload with invalid email', async function () {
    console.log('I have employee payload with invalid email');
  payload = {
    id: 11,
    firstName: 'Tylera',
    lastName: 'Parkera',
    dob: '1999-08-20',
    email: 'tyler_park' // invalid email
  };

  apiContext = await request.newContext({
    baseURL: 'http://localhost:8887',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      accept: '*/*'
    }
  });
});

Then('the response status should be 400', async function () {
    console.log(`Response status:############### ${response.status()}`);
  expect(response.status()).toBe(400);
});

Then('the response should contain email validation error', async function () {
    responseBody = await response.json();
    console.log(responseBody.message);
    expect(responseBody.message).toContain('Validation failed');

    expect(responseBody.errors[0].field).toBe('email');
    expect(responseBody.errors[0].rejectedValue).toBe('tyler_park');

    expect(responseBody.errors[0].defaultMessage)
        .toContain('must be a well-formed email address');
});


//=========================
Given('I have employee id {int}', async function (id: number) {
  employeeId = id;

  apiContext = await request.newContext({
    baseURL: 'http://localhost:8887',
    extraHTTPHeaders: {
      accept: '*/*'
    }
  });
});

When('I send GET request for employee', async function () {
  response = await apiContext.get(`/api/v1/employees/${employeeId}`);
  responseBody = await response.json();
});

Then('the response status should be 200', async function () {
  expect(response.status()).toBe(200);
});

Then('the response should contain correct employee data', async function () {
  expect(responseBody).toHaveProperty('id');
  expect(responseBody).toHaveProperty('firstName');
  expect(responseBody).toHaveProperty('lastName');
  expect(responseBody).toHaveProperty('dob');
  expect(responseBody).toHaveProperty('email');

  expect(responseBody.id).toBe(11);
  expect(responseBody.email).toContain('@');


});

//=========================
Given('I have empty employee id', async function () {
  apiContext = await request.newContext({
    baseURL: 'http://localhost:8887',
    extraHTTPHeaders: {
      accept: '*/*'
    }
  });
});

When('I send GET request with empty id', async function () {
  response = await apiContext.get('/api/v1/employees/ ');
});

Then('the response status should be 404', async function () {
  expect(response.status()).toBe(404);
  const body = await response.text();
  console.log(body);
});

