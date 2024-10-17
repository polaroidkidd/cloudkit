<script lang="ts">
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
	class={'feather feather-x' + clazz}
>
	<line x1="18" y1="6" x2="6" y2="18"></line>
	<line x1="6" y1="6" x2="18" y2="18"></line>
</svg>
