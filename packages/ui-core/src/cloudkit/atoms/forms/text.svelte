<script lang="ts">
	import classNames from 'classnames';
	import Typography from '../typography/typography.svelte';
	import type { HTMLInputTypeAttribute } from '@components/atoms/forms/inputTypes';

	export let labelText: string;
	export let fieldName: string;
	export let value: string;
	export let type: HTMLInputTypeAttribute = 'text';
	export let invalidData: string = '';
	export let placeHolder: string = '';
	let clazz = '';
	export { clazz as class };
	export let autocomplete = 'off';
	function typeAction(node: HTMLInputElement) {
		node.type = type;
	}
</script>

<div class={clazz}>
	<label for={fieldName} class="label pl-5">
		<Typography weight="extrabold" class="pb-5">
			{labelText}
		</Typography>
	</label>
	<input
		use:typeAction
		class={classNames('input', 'bg-primary-50', 'py-2', 'px-5', 'mb-3')}
		name={fieldName}
		bind:value
		data-invalid={invalidData}
		{autocomplete}
		placeholder={placeHolder}
	/>
</div>

{#if invalidData}
	<Typography variant="div" class="text-error-500">
		{invalidData}
	</Typography>
{/if}

<style>
	.contactField {
		display: none;
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
