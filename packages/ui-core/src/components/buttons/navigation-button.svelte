<script lang="ts">
	import { page } from '$app/stores';
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';
	import { IconArrowRight } from '../icons';
	import type { Fill, Variant } from "./simple-button.svelte";
	export let href:string;
	export let variant: Variant = undefined;
	export let fill: Fill = undefined;
	let clazz = '';
	export { clazz as class };
</script>

<a
	{href}
	class={twMerge(
		classNames(
			'btn',
			{
				'variant-filled': !variant && (!fill || fill === 'filled'),
				'variant-ghost': !variant && fill === 'ghost',
				'variant-soft': !variant && fill === 'soft',
				'variant-ringed': !variant && fill === 'ringed',
				'variant-filled-surface': variant === 'surface' && (!fill || fill === 'filled'),
				'variant-filled-primary': variant === 'primary' && (!fill || fill === 'filled'),
				'variant-filled-secondary': variant === 'secondary' && (!fill || fill === 'filled'),
				'variant-filled-tertiary': variant === 'tertiary' && (!fill || fill === 'filled'),
				'variant-filled-success': variant === 'success' && (!fill || fill === 'filled'),
				'variant-filled-warning': variant === 'warning' && (!fill || fill === 'filled'),
				'variant-filled-error': variant === 'error' && (!fill || fill === 'filled'),
				'variant-ghost-surface': variant === 'surface' && fill === 'ghost',
				'variant-ghost-primary': variant === 'primary' && fill === 'ghost',
				'variant-ghost-secondary': variant === 'secondary' && fill === 'ghost',
				'variant-ghost-tertiary': variant === 'tertiary' && fill === 'ghost',
				'variant-ghost-success': variant === 'success' && fill === 'ghost',
				'variant-ghost-warning': variant === 'warning' && fill === 'ghost',
				'variant-ghost-error': variant === 'error' && fill === 'ghost',
				'variant-soft-surface': variant === 'surface' && fill === 'soft',
				'variant-soft-primary': variant === 'primary' && fill === 'soft',
				'variant-soft-secondary': variant === 'secondary' && fill === 'soft',
				'variant-soft-tertiary': variant === 'tertiary' && fill === 'soft',
				'variant-soft-success': variant === 'success' && fill === 'soft',
				'variant-soft-warning': variant === 'warning' && fill === 'soft',
				'variant-soft-error': variant === 'error' && fill === 'soft',
				'variant-ringed-surface': variant === 'surface' && fill === 'ringed',
				'variant-ringed-primary': variant === 'primary' && fill === 'ringed',
				'variant-ringed-secondary': variant === 'secondary' && fill === 'ringed',
				'variant-ringed-tertiary': variant === 'tertiary' && fill === 'ringed',
				'variant-ringed-success': variant === 'success' && fill === 'ringed',
				'variant-ringed-warning': variant === 'warning' && fill === 'ringed'
			},
			clazz
		)
	)}
>
	{#if $page.url.pathname === href}
		<IconArrowRight class="-ml-8 mr-2" />
	{/if}
	<slot />
</a>
