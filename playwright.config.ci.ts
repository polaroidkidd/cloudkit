import { devices, type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm dev',
		port: 4000
	},
	retries: 1,
	expect: {
		timeout: 10000
	},
	// Reporter to use
	reporter: 'github',
	testDir: 'tests/e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome',
				// Collect trace when retrying the failed test.
				trace: 'on',
				// Viewport used for all pages in the context.
				viewport: { width: 1920, height: 1080 },
				baseURL: 'http://localhost:4000'
			}
		}
	]
};

export default config;
