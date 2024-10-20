import { PATHS } from '@lib/routing/paths';
import { expect, test } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
const USER = {
	EMAIL: 'playwright-group-test@test.com',
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

test('Create a User', async ({ baseURL, page }) => {
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
		await page.getByLabel('Confirm Signing Up').click();
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}`);
		const button = page.getByRole('button', { name: "Don't show this again" });
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForTimeout(500);
		const isVisible = await page.getByTestId('onboarding-modal').isVisible();
		expect(isVisible).toBe(false);
	});
});

test('Create collections', async ({ baseURL, page }) => {
	await test.step('sign in', async () => {
		await page.goto(baseURL as string);

		await page.getByRole('button', { name: 'Sign In' }).click();

		await page.locator('input[name="email"]').fill(USER.EMAIL);
		await page.locator('input[name="password"]').fill(USER.PASSWORD);
		await page.getByLabel('Confirm Sign In').click();
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
	});
	await test.step('create a group', async () => {
		await page.getByRole('button', { name: 'Create a Collection' }).click();
		const modal = page.getByTestId('create-collection-modal');
		const isVisible = await modal.isVisible();
		expect(isVisible).toBe(true);
		const textBox = page.getByTestId('create-collection-modal').getByRole('textbox');
		await textBox.fill('Test Group');
		const button = page.getByLabel('Create Collection');
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForResponse((response) => response.url().includes('createCollection'));
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
		const collection = await db.collection.findFirst({
			where: {
				name: 'Test Group'
			}
		});

		expect(collection).toBeTruthy();
		const isNewCollectionVisible = await page.getByText('Test Group').isVisible();
		expect(isNewCollectionVisible).toBe(true);
	});
	await test.step('navigate to group', async () => {
		await page.getByRole('link', { name: 'View Items' }).click();
		const collection = await db.collection.findFirst({
			where: {
				name: 'Test Group'
			}
		});
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}/${collection?.id}`);
		expect(page.url()).toBe(`${baseURL as string}${PATHS.COLLECTIONS}/${collection?.id}`);
	});

	await test.step('create a nested collection', async () => {
		await page.getByRole('button', { name: 'Add a Sub Group' }).click({ force: true });
		const modal = page.getByTestId('create-collection-modal');
		const isVisible = await modal.isVisible();
		expect(isVisible).toBe(true);
		const textBox = page.getByTestId('create-collection-modal').getByRole('textbox');
		await textBox.fill('Test Child Group');
		const button = page.getByLabel('Create Collection');
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForResponse((response) => response.url().includes('createCollection'));
		const parentCollection = await db.collection.findFirst({
			where: {
				name: 'Test Group',
				isRoot: true
			}
		});
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}/${parentCollection?.id}`);
		const childCollection = await db.collection.findFirst({
			where: {
				name: 'Test Child Group',
				isRoot: false,
				parentId: parentCollection!.id
			}
		});

		expect(childCollection).toBeTruthy();
		const isNewCollectionVisible = await page.getByText('Test Child Group').isVisible();
		expect(isNewCollectionVisible).toBe(true);
	});
	await test.step('navigate back to parent group', async () => {
		await page.goBack();
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
		expect(page.url()).toBe((baseURL as string) + PATHS.COLLECTIONS);
	});

	await test.step('Attempt to create duplicate collections', async () => {});
});

test('Delete Collections', async ({ baseURL, page }) => {
	async function signIn() {
		await page.goto(baseURL as string);

		await page.getByRole('button', { name: 'Sign In' }).click();

		await page.locator('input[name="email"]').fill(USER.EMAIL);
		await page.locator('input[name="password"]').fill(USER.PASSWORD);
		await page.getByLabel('Confirm Sign In').click();
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
	}

	async function createGroup(name: string) {
		await page.getByRole('button', { name: 'Create a Collection' }).click();
		const modal = page.getByTestId('create-collection-modal');
		const isVisible = await modal.isVisible();
		expect(isVisible).toBe(true);
		const textBox = page.getByTestId('create-collection-modal').getByRole('textbox');
		await textBox.fill(name);
		const button = page.getByLabel('Create Collection');
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForResponse((response) => response.url().includes('createCollection'));
		await page.waitForURL((baseURL as string) + PATHS.COLLECTIONS);
	}

	await test.step('delete parent collection without children', async () => {
		await db.collection.deleteMany({
			where: {
				User: {
					email: USER.EMAIL
				}
			}
		});
		await signIn();
		await createGroup('Test Group WIthout Child');
		await page.getByRole('button', { name: 'Delete Collection' }).click();
		await page.getByTestId('confirm-deleting-collection').click();

		await page.waitForResponse((response) => response.url().includes('deleteCollection'));
		const collections = await db.collection.findMany({
			where: {
				name: 'Test Group WIthout Child'
			}
		});
		expect(collections).toStrictEqual([]);
	});

	await test.step('Attempt to delete a parent collection with children', async () => {
		await createGroup('Test Group Parent');

		await page.getByRole('link', { name: 'View Items' }).click();
		const collection = await db.collection.findFirst({
			where: {
				name: 'Test Group Parent'
			}
		});
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}/${collection?.id}`);

		await page.getByRole('button', { name: 'Add a Sub Group' }).click({ force: true });

		const textBox = page.getByTestId('create-collection-modal').getByRole('textbox');
		await textBox.fill('Test Child Group');
		const button = page.getByLabel('Create Collection');
		await button.waitFor({ state: 'attached' });
		await button.click({ force: true });
		await page.waitForResponse((response) => response.url().includes('createCollection'));
		await page.goBack();

		await page.getByRole('button', { name: 'Delete Collection' }).click();
		await page.getByTestId('confirm-deleting-collection').click();
		await page.waitForResponse((response) => response.url().includes('deleteCollection'));
		const errorModal = page.getByText("Collection has children. Can'");
		expect(errorModal).toBeVisible();
	});

	await test.step('Delete Chilld first, then parent', async () => {
		await page.getByRole('link', { name: 'View Items' }).click();
		const collection = await db.collection.findFirst({
			where: {
				name: 'Test Group Parent'
			}
		});
		await page.waitForURL(`${baseURL as string}${PATHS.COLLECTIONS}/${collection?.id}`);

		await page.getByRole('button', { name: 'Delete Collection' }).click();
		await page.getByTestId('confirm-deleting-collection').click();
		await page.waitForResponse((response) => response.url().includes('deleteCollection'));
		await page.goBack();
		await page.getByRole('button', { name: 'Delete Collection' }).click();
		await page.getByTestId('confirm-deleting-collection').click();
		await page.waitForResponse((response) => response.url().includes('deleteCollection'));
		const collections = await db.collection.findMany({
			where: {
				User: {
					email: USER.EMAIL
				}
			}
		});
		expect(collections).toStrictEqual([]);
	});
});
