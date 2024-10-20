<script lang="ts">
	export let titel: string;
	export let description: string;
</script>

<div class="flex flex-grow flex-col m-5 max-w-lg mx-auto">
	<slot name="badge">
		<span class="badge bg-primary-500">💀</span>
	</slot>
	<div class="text-2xl my-3 text-center">{titel}</div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<div class="text-xl mt-auto h-full">{@html description}</div>
</div>
