<script lang="ts">
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';

	let clazz = '';
	export { clazz as class };

	export let width = 24;
	export let height = 24;
</script>

<svg
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
	<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
	<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
</svg>
