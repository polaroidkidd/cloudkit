import { expect, test as it } from '@playwright/test';
const USER = {
	EMAIL: 'playwright@test.com',
	FRST_NAME: 'Play',
	LAST_NAME: 'Wirght',
	PASSWORD: 'password123',
	CONFIRM_PASSWORD: 'password123'
};
it('should render a couple of existing users', async ({ page, baseURL }) => {
	await page.goto(`${baseURL as string}/users`, { waitUntil: 'networkidle' });

	const links = page.getByTestId('user-container');
	await expect(links).toBeVisible();
});

it('should render Sign In button', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
});

it('should render Sign Up button', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
});

it('should render Sign Up Form', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	const button = await page.getByRole('button', { name: 'Sign Up' });
	if (button) {
		await button.click();
		await expect(
			page.getByText(
				'Email First Name Last Name Password Confirm Password Upload your avatar Allowed '
			)
		).toBeVisible();
	} else {
		it.fail(true, 'Sign Up button not found');
	}
});

it('should fill Sign Up Form', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Sign Up' }).click();
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
	await expect(page.locator('input[name="email"]')).toHaveValue(USER.EMAIL);
	await expect(page.locator('input[name="firstName"]')).toHaveValue(USER.FRST_NAME);
	await expect(page.locator('input[name="lastName"]')).toHaveValue(USER.LAST_NAME);
	await expect(page.locator('input[name="password"]')).toHaveValue(USER.PASSWORD);
	await expect(page.locator('input[name="confirmPassword"]')).toHaveValue(USER.CONFIRM_PASSWORD);
});

it('should redirect to user page after account creation', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Sign Up' }).click();
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

	await page.getByLabel('Confirm Signing Up').click();
	await page.waitForURL((baseURL as string) + '/home', { waitUntil: 'networkidle' });

	expect(page).toHaveURL((baseURL as string) + '/home');
});
it('should redirect to user page after signing in', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Sign In' }).click();

	await page.locator('input[name="email"]').fill(USER.EMAIL);
	await page.locator('input[name="password"]').fill(USER.PASSWORD);

	await page.getByLabel('Confirm Sign In').click();
	await page.waitForURL((baseURL as string) + '/home', { waitUntil: 'networkidle' });
	expect(page).toHaveURL((baseURL as string) + '/home');
});

it('should redirect to home page after signing out', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Sign In' }).click();

	await page.locator('input[name="email"]').fill(USER.EMAIL);
	await page.locator('input[name="password"]').fill(USER.PASSWORD);

	await page.getByLabel('Confirm Sign In').click();
	await page.waitForURL((baseURL as string) + '/home', { waitUntil: 'networkidle' });
	await page.getByRole('button', { name: 'member icon' }).click();

	await page.getByRole('button', { name: 'Sign Out' }).click();
	await page.waitForURL(baseURL as string, { timeout: 10000 });
	expect(page).toHaveURL(baseURL as string);
});
it('should redirect to home after deleting the account', async ({ page, baseURL }) => {
	await page.goto(baseURL as string, { waitUntil: 'networkidle' });

	await page.getByRole('button', { name: 'Sign In' }).click();

	await page.locator('input[name="email"]').fill(USER.EMAIL);
	await page.locator('input[name="password"]').fill(USER.PASSWORD);

	await page.getByLabel('Confirm Sign In').click();
	await page.waitForURL((baseURL as string) + '/home', { waitUntil: 'networkidle' });
	page.getByRole('button', { name: 'member icon' }).click();
	await page.getByLabel('Delete Account').click();
	await page.waitForURL(baseURL as string, { timeout: 10000 });
	expect(page).toHaveURL(baseURL as string);
});
