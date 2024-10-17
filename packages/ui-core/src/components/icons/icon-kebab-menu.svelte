<script lang="ts">
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';

	let clazz = '';
	export { clazz as class };
	export let height = 24;
	export let width = 24;
</script>

<svg
	{width}
	{height}
	viewBox="0 0 24 24"
	fill="none"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	class={classNames(twMerge('stroke-current', 'dark:stroke-current-dark', clazz))}
>
	<circle cx="12" cy="12" r="1"></circle>
	<circle cx="12" cy="5" r="1"></circle>
	<circle cx="12" cy="19" r="1"></circle>
</svg>
