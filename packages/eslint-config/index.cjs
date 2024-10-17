/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: false,
	plugins: ['@typescript-eslint', 'unused-imports'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'plugin:yml/standard',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		},
		{
			files: ['*.yml'],
			parser: 'yaml-eslint-parser'
		}
	],
	rules: {
		'no-console': ['error', { allow: ['warn', 'error'] }],
		'lines-around-directive': ['error', { before: 'always', after: 'always' }]
	},
	ignorePatterns: ['*.js', '*.json', '*.md', '!turbo.json', '*.css']
};
