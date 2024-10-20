<script lang="ts">
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';

	export let width = 24;
	export let height = 24;
	let clazz = '';
	export { clazz as class };
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
	<line x1="5" y1="12" x2="19" y2="12"></line>
	<polyline points="12 5 19 12 12 19"></polyline>
</svg>
