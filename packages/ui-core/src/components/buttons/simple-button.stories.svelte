<script lang="ts" context="module">
	import Button from './simple-button.svelte';
	export const meta = {
		title: 'Core/Button',
		component: Button,
		tags: ['autodocs']
	};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';

	let count = 0;
	function handleClick() {
		count += 1;
	}
</script>

<Template let:args>
	<Button {...args} on:click on:click={handleClick}>
		You clicked: {count}
	</Button>
</Template>

<Story name="Primary" args={{ variant: 'primary' }} />
<Story name="Secondary" source args={{ variant: 'secondary' }} />
<Story name="Tertiary" source args={{ variant: 'tertiary' }} />
<Story name="Warning" source args={{ variant: 'warning' }} />
<Story name="Error" source args={{ variant: 'error' }} />
<Story name="Success" source args={{ variant: 'success' }} />
<Story name="Ghost" source args={{ fill: 'ghost' }} />
<Story name="No Args" source />
