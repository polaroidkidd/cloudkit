<script lang="ts">
	import { dev } from '$app/environment';

	
	
	import type { Image } from '@cloudkit/db-schema';
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';
	export let image: Partial<Image> | undefined | null = undefined;
	export let alt = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	export let decoding: 'sync' | 'async' | 'auto' = 'auto';
	let clazz: string = '';
	export { clazz as class };

	let url = `${image?.url}${dev ? '' : `/${variant}`}?${Date.parse(new Date(image!.updatedAt!).toISOString() ?? '')}`;
	type Sizes = {
		maxWidth: number;
		widthSlot: number;
	}[];
	export let sizes: Sizes | undefined = undefined;
</script>

<img
	{loading}
	{decoding}
	src={url}
	{alt}
	class={classNames(twMerge(clazz))}
	bind:this={image}
	{width}
	{height}
	srcset={dev
		? url
		: [`${url}/xs`, `${url}/sm`, `${url}/md`, `${url}/lg`, `${url}/xl`].join(', ')}
	sizes={sizes
		? sizes
				?.map(({ maxWidth, widthSlot }) => `(max-width: ${maxWidth}px) ${widthSlot}px`)
				.join(', ')
		: '(max-width: 640px) 500px, (max-width: 768px) 900px, 1280px'}
/>
