import {expect, test} from '@playwright/test'

test.beforeEach(async ({ page }) =>                     //test.beforeAll can be used to run some code before all tests. It used not often
{   await page.goto('https://askomdch.com/store/')         //test.afterEach or test.afterAll to run code after test. It not very good practic to use it

}) 

