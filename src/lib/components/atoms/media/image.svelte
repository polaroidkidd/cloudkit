<script lang="ts">
	export let src: string | null | undefined;
	export let alt = '';
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let width = 294;
	export let height = 196;
	let clazz: string = '';
	export { clazz as class };
</script>

{#if src !== null}
	<img {loading} src={`${src}`} {alt} class={clazz} {width} {height} />
{/if}
