<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import Typography from '../typography/typography.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let labelText: string;
	export let fieldName: string;
	export let value: string;
	export let invalidData: string = '';
	export let suggestions: AutocompleteOption[] = [];

	let allowList = suggestions.map((s) => s.value);
	function onSuggestionSelect(event: CustomEvent<AutocompleteOption>): void {
		value = event.detail.label;
		dispatch('selected', event.detail.meta);
	}

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
</script>

<div class="mb-4">
	<label for={fieldName} class="label pl-5">
		<Typography weight="extrabold" class="pb-5">
			{labelText}
		</Typography>
	</label>
	<input
		class="input autocomplete pl-5"
		type="search"
		name={fieldName}
		bind:value
		placeholder="Search..."
		use:popup={popupSettings}
	/>
	<div data-popup="popupAutocomplete" class="popup w-modal">
		<Autocomplete
			bind:input={value}
			options={suggestions}
			allowlist={allowList}
			on:selection={onSuggestionSelect}
			regionNav="backdrop-blur-sm bg-white/30 rounded-lg mx-8"
		/>
	</div>
	{#if invalidData}
		<Typography variant="div" class="text-error-500">
			{invalidData}
		</Typography>
	{/if}
</div>

<style>
	.popup {
		z-index: 1000;
	}
</style>
