<script lang="ts">
	import classNames from 'classnames';
	import Typography from '../typography/typography.svelte';
	export let fieldName: string;
	export let value: string;
	export let maxLength = 500;
	export let labelText = '';
	export let invalidData: string = '';
</script>

<label for={fieldName} class="label pl-5">
	<Typography weight="extrabold">
		{labelText}
	</Typography>
</label>
<textarea
	maxlength={maxLength}
	minlength={20}
	rows="10"
	class={classNames('textarea', 'bg-primary-50', 'py-2', 'px-5', 'mb-3')}
	name={fieldName}
	bind:value
	data-invalid={invalidData}
/>
{#if invalidData}
	<Typography variant="p" class="text-gray-50">
		{invalidData}
	</Typography>
{/if}

<style>
	.contactField {
		display: none;
	}
</style>
