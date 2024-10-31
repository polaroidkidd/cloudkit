<script lang="ts">
	import type { Actions } from './../../model/';

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import classNames from 'classnames';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';
	import { IconKebabMenu } from '../icons';
	import Typography from '../typography/typography.svelte';

	export let actions: Actions = [];
	export let title = '';
	export { clazz as class };
	let clazz = '';
	let targetId = `target-${uuid()}`;
	let popupClick: PopupSettings = {
		event: 'click',
		target: targetId
	};

	onMount(() => {
		targetId = `target-${uuid()}`;
		popupClick = {
			event: 'click',
			target: targetId
		};
	});
</script>

<div
	class={classNames(
		twMerge('card relative flex-1 flex flex-col justify-between  rounded-lg p-5', clazz)
	)}
>
	{#if title.length > 0}
		<Typography align="center" weight="bold" size="lg" variant="div">
			{title}
		</Typography>
	{/if}
	{#if actions.length > 0}
		<button
			use:popup={popupClick}
			type="button"
			class="absolute bg-primary-300 rounded-lg rounded-t-none rounded-r-none right-0 top-0 pr-2 pt-2"
		>
			<IconKebabMenu class="relative -top-1 left-1" />
		</button>
	{/if}
	<slot />
	<div data-popup={targetId}>
		<div class="relative z-50 btn-group-vertical variant-filled-primary rounded-lg">
			{#each actions as action}
				{#if action.href}
					<a href={action.href}>{action.title}</a>
				{:else}
					<button
						on:click={action.callback}
						disabled={action.disabled}
						class={classNames({
							'variant-filled-primary': action.level === 'primary',
							'variant-filled-success': action.level === 'success',
							'variant-filled-warning': action.level === 'warning',
							'variant-filled-error': action.level === 'error'
						})}
					>
						{action.title}
					</button>
				{/if}
			{/each}
		</div>
	</div>
</div>
