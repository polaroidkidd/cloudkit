import { PATHS } from '@lib/routing/paths';
import { expect, test } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
const USER = {
	EMAIL: 'playwright-user-auth-test@test.com',
	FRST_NAME: 'Play',
	LAST_NAME: 'Wirght',
	PASSWORD: 'password123',
	CONFIRM_PASSWORD: 'password123'
};

const db = new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
});
test.afterAll(async () => {
	await db.user.deleteMany({
		where: {
			email: USER.EMAIL
		}
	});
});

test('User Registration', async ({ baseURL, page }) => {
	await test.step('fill in user registration form', async () => {
		await page.goto(baseURL as string);

		await page.getByRole('button', { name: 'Register' }).click();
		await expect(
			page.getByText(
				'Email First Name Last Name Password Confirm Password Upload your avatar Allowed '
			)
		).toBeVisible();
		await page.locator('input[name="email"]').fill(USER.EMAIL);
		await page.locator('input[name="firstName"]').fill(USER.FRST_NAME);
		await page.locator('input[name="lastName"]').fill(USER.LAST_NAME);
		await page.locator('input[name="password"]').fill(USER.PASSWORD);
		await page.locator('input[name="confirmPassword"]').fill(USER.CONFIRM_PASSWORD);

		expect(await page.locator('input[name="email"]').inputValue()).toBe(USER.EMAIL);
		expect(await page.locator('input[name="firstName"]').inputValue()).toBe(USER.FRST_NAME);
		expect(await page.locator('input[name="lastName"]').inputValue()).toBe(USER.LAST_NAME);
		expect(await page.locator('input[name="password"]').inputValue()).toBe(USER.PASSWORD);
		expect(await page.locator('input[name="confirmPassword"]').inputValue()).toBe(
			USER.CONFIRM_PASSWORD
		);
	});

	await test.step('submit user registration form', async () => {
		await page.getByLabel('Confirm Signing Up').click();
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}`);

		expect(page).toHaveURL(`${baseURL as string}${PATHS.COLLECTIONS}`);
	});

	await test.step('dismiss onboarding', async () => {
		const button = page.getByRole('button', { name: "Don't show this again" });
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForTimeout(1000);
		const isVisible = await page.getByTestId('onboarding-modal').isVisible();
		expect(isVisible).toBe(false);
	});
	await test.step('sign out', async () => {
		await page.getByRole('button', { name: 'member icon' }).click();

		await page.getByRole('button', { name: 'Sign Out' }).click();
		await page.waitForURL(baseURL as string);

		expect(page).toHaveURL(baseURL as string);
		const user = await db.user.findFirst({
			where: {
				email: USER.EMAIL
			}
		});

		expect(user).not.toBeNull();
	});
});
test('User Deletion', async ({ baseURL, page }) => {
	await test.step('sign in', async () => {
		await page.goto(baseURL as string);

		await page.getByRole('button', { name: 'Sign In' }).click();

		await page.locator('input[name="email"]').fill(USER.EMAIL);
		await page.locator('input[name="password"]').fill(USER.PASSWORD);
		expect(await page.locator('input[name="email"]').inputValue()).toBe(USER.EMAIL);
		expect(await page.locator('input[name="password"]').inputValue()).toBe(USER.PASSWORD);
	});

	await test.step('submit sign in form', async () => {
		await page.getByLabel('Confirm Sign In').click();
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
		expect(page).toHaveURL((baseURL as string) + PATHS.COLLECTIONS);
	});

	await test.step('navigate to profile page', async () => {
		await page.getByRole('navigation').getByRole('link').click();
		await page.waitForURL((baseURL as string) + PATHS.PROFILE);
		expect(page).toHaveURL((baseURL as string) + PATHS.PROFILE);
	});

	await test.step('delete account', async () => {
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await page.getByRole('button', { name: 'Delete Account' }).click();
		await page.getByTestId('modal').getByRole('button', { name: 'Confirm' }).click();
		await page.waitForURL(baseURL as string);
		expect(page).toHaveURL(baseURL as string);
		const user = await db.user.findFirst({
			where: {
				email: USER.EMAIL
			}
		});

		expect(user).toBeNull();
	});
});
