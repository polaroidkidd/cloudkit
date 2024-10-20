import { devices } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
dotenv.config({ path: path.resolve(__dirname, '.env.development') });

export default defineConfig({
	webServer: {
		command: 'pnpm run-ci',
		port: 3000
	},
	retries: 0,
	// test timeout set to 10 seconds
	timeout: 30_000,
	expect: {
		// expect timeout set to 10 seconds
		timeout: 30_000
	},
	// Reporter to use
	use: {
		actionTimeout: 10_000
	},
	// Reporter to use
	reporter: 'html',
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome',
				viewport: { width: 1920, height: 1080 },
				baseURL: 'http://localhost:4000'
			}
		}
	]
});
