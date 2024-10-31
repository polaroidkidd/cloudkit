const configuration = {
	name: process.env.CLOUDFLARE_PROJECT_NAME,
	production_branch: 'master',
	preview_deployment_setting: 'none',
	canonical_deployment: {},
	deployments_enabled: false,
	build_config: {},
	source: {
		type: 'github',
		config: {
			owner: process.env.GITHUB_PROJECT_OWNER,
			repo_name: process.env.GITHUB_REPO_NAME,
			production_branch: 'master',
			pr_comments_enabled: false,
			deployments_enabled: false,
			production_deployments_enabled: false,
			preview_deployment_setting: 'none'
		}
	},
	deployment_configs: {
		preview: {
			env_vars: {
				DATABASE_URL: {
					type: 'secret_text',
					value: process.env.DATABASE_URL
				},
				DATA_PROXY: {
					type: 'secret_text',
					value: process.env.DATA_PROXY
				},
				REDIS_URL: {
					type: 'secret_text',
					value: process.env.REDIS_URL
				},
				REDIS_TOKEN: {
					type: 'secret_text',
					value: process.env.REDIS_TOKEN
				},
				IMAGE_API_TOKEN: {
					type: 'secret_text',
					value: process.env.IMAGE_API_TOKEN
				},
				IMAGE_API: {
					type: 'secret_text',
					value: process.env.IMAGE_API
				},
				PUBLIC_IMAGE_DELIVERY: {
					type: 'secret_text',
					value: process.env.PUBLIC_IMAGE_DELIVERY
				},
				IS_CI: {
					type: 'secret_text',
					value: process.env.IS_CI
				}
			}
		},
		production: {
			env_vars: {
				DATABASE_URL: {
					type: 'secret_text',
					value: process.env.DATABASE_URL
				},
				DATA_PROXY: {
					type: 'secret_text',
					value: process.env.DATA_PROXY
				},
				REDIS_URL: {
					type: 'secret_text',
					value: process.env.REDIS_URL
				},
				REDIS_TOKEN: {
					type: 'secret_text',
					value: process.env.REDIS_TOKEN
				},
				IMAGE_API_TOKEN: {
					type: 'secret_text',
					value: process.env.IMAGE_API_TOKEN
				},
				IMAGE_API: {
					type: 'secret_text',
					value: process.env.IMAGE_API
				},
				PUBLIC_IMAGE_DELIVERY: {
					type: 'secret_text',
					value: process.env.PUBLIC_IMAGE_DELIVERY
				},
				IS_CI: {
					type: 'secret_text',
					value: process.env.IS_CI
				}
			}
		}
	}
};

const response = await fetch(
	`https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/pages/projects`,
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
		},
		body: JSON.stringify(configuration)
	}
);
const data = await response.json();
console.info('data: ', data);
