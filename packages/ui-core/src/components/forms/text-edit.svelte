<script lang="ts">
	import { IconEdit, IconLoading } from "../icons";
	import Typography from "../typography/typography.svelte";

	

	export let value = '';
	export let name: string;
	export let isLoading = false;
	export let invalidData: string = '';

	function focus(event: Event) {
		event.preventDefault();
		document.getElementById(name)?.focus();
	}
</script>

<div class="flex items-center justify-between">
	<input
		{name}
		id={name}
		bind:value
		class="outline-none"
		on:blur={() => value.trim()}
		autocomplete={'false'}
	/>

	<button class="w-6 h-6 ml-5" on:click={focus} tabindex="-1">
		{#if isLoading}
			<IconLoading class="w-6 h-6" />
		{:else}
			<IconEdit />
		{/if}
	</button>
</div>
{#if invalidData}
	<Typography variant="div" class="text-error-500">
		{invalidData}
	</Typography>
{/if}

<style lang="scss">
	input {
		border: none;
		background: none;
		font-size: inherit;
		color: inherit;
		font-weight: inherit;
		text-align: inherit;
		box-shadow: none;
		padding: 0;
		margin: 0;
		width: 100%;
		line-height: 1;
		&:focus {
			overflow: hidden;
			width: 100%;
			border: none;
			background: none;
			font-size: inherit;
			color: inherit;
			font-weight: inherit;
			text-align: inherit;
			box-shadow: none;
			line-height: 1;
		}
	}
</style>
