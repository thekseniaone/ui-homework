const { test, expect } = require('@playwright/test');


//список тестов для страницы https://www.saucedemo.com/
//1. Попытка логина без ввода данных
//2. Попытка логина с рандомным логином (без пароля)
//3. Попытка логина с рандомным паролем (без логина)
//4. Попытка логина с логином и неправильным паролем
//5. Попытка логина с правильным логином и паролем


test('1. Trying to login without credentials', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.locator('[data-test="username"]').waitFor({state:'visible'})
    await page.locator('[data-test="password"]').waitFor({state:'visible'})
    
    await page.locator('[id="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
    });

test('2. Trying to login with login only', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.locator('[data-test="username"]').waitFor({state:'visible'})
    await page.locator('[data-test="password"]').waitFor({state:'visible'})

    await page.locator('[data-test="username"]').click()
    await page.locator('[data-test="username"]').fill('test login')

    await page.locator('[id="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required')
    });


test('3. Trying to login with password only', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.locator('[data-test="username"]').waitFor({state:'visible'})
    await page.locator('[data-test="password"]').waitFor({state:'visible'})

    await page.locator('[data-test="password"]').click()
    await page.locator('[data-test="password"]').fill('test pass')

    await page.locator('[id="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required')
    });

test('4. Trying to login with wrong pass and login', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
    await page.locator('[data-test="username"]').waitFor({state:'visible'})
    await page.locator('[data-test="password"]').waitFor({state:'visible'})

    await page.locator('[data-test="username"]').click()
    await page.locator('[data-test="username"]').fill('test login')

    await page.locator('[data-test="password"]').click()
    await page.locator('[data-test="password"]').fill('test pass')

    await page.locator('[id="login-button"]').click()
    await expect(page.locator('[data-test="error"]')).toBeVisible()
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    });

test('5. Trying to login with correct pass and login', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Swag Labs/);
        await page.locator('[data-test="username"]').waitFor({state:'visible'})
        await page.locator('[data-test="password"]').waitFor({state:'visible'})
    
        await page.locator('[data-test="username"]').click()
        await page.locator('[data-test="username"]').fill('standard_user')
    
        await page.locator('[data-test="password"]').click()
        await page.locator('[data-test="password"]').fill('secret_sauce')
    
        await page.locator('[id="login-button"]').click()
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
        });