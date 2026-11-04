import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) =>                 
{   await page.goto('http://uitestingplayground.com/ajax')       
    await page.getByText('Button Triggering AJAX Request').click() 


})   

test('auto await', async({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()

    await successButton.waitFor({state: 'attached'})   //if we need to work with meyhod that is not suport by autowait we can use waitFor and it can be element or response
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.' , {timeout:20000})



    //wait for element
    await page.waitForSelector('.bg-success')

    //wait roe response\
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')  //response from network

})
