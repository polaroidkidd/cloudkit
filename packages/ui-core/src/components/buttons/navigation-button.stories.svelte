<script lang="ts" context="module">
	import Button from './navigation-button.svelte';

	export const meta = {
		title: 'Core/Navigation Button',
		component: Button,
		tags: ['autodocs'],
		parameters: {
			sveltekit_experimental: {
				stores: {
					page: {
						url: {
							pathName: '/',
							queryString: '',
							hash: '',
							href: '/',
							origin: 'http://localhost:3000',
							pathname: '/',
							search: '',
							params: {
								collectionId: '123',
								itemId: '456',
								id: '789'
							}
						}
					}
				}
			}
		}
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
</script>

<Template let:args>
	<Button {...args}>You are navigating to {args.href}</Button>
</Template>

<Story name="Primary" args={{ href: '/new-page', variant: 'primary', fill: 'filled' }} />
<Story name="No Args" args={{ href: '/new-page' }} />
