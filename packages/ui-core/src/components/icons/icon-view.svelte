<script lang="ts">
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';

	let clazz = '';
	export { clazz as class };
	export let height = 24;
	export let width = 24;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={classNames(twMerge(clazz))}
>
	<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
	<circle cx="12" cy="12" r="3"></circle>
</svg>
