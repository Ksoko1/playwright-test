import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) =>                     //test.beforeAll can be used to run some code before all tests. It used not often
{   await page.goto('https://playground.bondaracademy.com/')         //test.afterEach or test.afterAll to run code after test. It not very good practic to use it
    await page.getByText('Forms').click()             //all above used not often
    await page.getByText('Form Layouts').click()


})       
//the mane syntax rules
test('Locator syntax rules', async({page}) => {  //search by tag use'', search by ID use '#', search by class use '.'
//by Tag name
page.locator('input')  //input is not unique name so it's find all 

//by ID
await page.locator('#inputEmail1').click() //we  need to use await wen we ave promise(click). click is a promise 

//by Class value
page.locator('.shape-rectangle')  // putiind . next to name mwans we are looking class. # looking id

//by attribute
page.locator('[placeholder="Email"]')

//by full class value
page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

//we can combine selectors. in this case playwright find match for all element
page.locator('input[placeholder="Email"].shape-rectangle')

//by partial text match
page.locator(':text("Using")')

//by exact text match
page.locator(':text-is("Using the Grid")')

})

//User facing locaters (best practic it the pkaywright becouse tey are acting like a user beaviour)
test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
})


//How to fing child elements
test('User child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

//we can mix using of regular locator + user facing locator
await page.locator('nb-card').getByRole('button', {name: "Sign in"}).click()

})

//how to find parent element
test('locating element', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"})
    .getByRole('textbox', {name: "Email"}).click()
})


test('reusing the locator', async({page}) => {
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click()

    //to optomize this code we can use constant and it will be like this

    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    
    await basicForm.getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.getByRole('button').click()


})


test('extracting values', async({page}) => {
    //single text value need to use method textContent
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text 
    
const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()  // allTextContens take all values from page locator
expect(allRadioButtonsLabels).toContain("Option 1")

//input value
const emailField = basicForm.getByRole('textbox', {name: "Email"})
await emailField.fill('test@test.com')
const emaiValue = await emailField.inputValue()  //if i need to take text that is inside email field (for ex) i need to use method input.value
expect(emaiValue).toEqual('test@test.com')

//attribute value

const placeholderValue = await emailField.getAttribute('placeholder')
expect(placeholderValue).toEqual('Email')

    })

test('assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")
//Locator assertion
await expect(basicFormButton).toHaveText('Submit')

//Soft Assertion
await expect.soft(basicFormButton).toHaveText('Submit')
await basicFormButton.click()

})


//to run it use command: npx playwright test --ui


// Await concept working with promises. Await needs to wait for sertain button or context become awailable so we can work with it ( tthe same with .click)
//it's waits till timeout for element