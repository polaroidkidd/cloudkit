<script lang="ts">
	import IconImagePlaceholder from '../icons/IconImagePlaceholder.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
	{#each { length: 15 } as i}
		{#key i}
			<section class="bg-slate-50 bg-opacity-30 rounded-lg p-4 my-4 flex-col gap-5">
				<div class="w-full h-32">
					<IconImagePlaceholder />
				</div>
				<div>
					<div class="grid grid-rows-4 grid-cols-12 gap-3">
						<div class="placeholder animate-pulse col-span-6 row-start-1" />
						<div class="placeholder animate-pulse col-span-8 row-start-2" />
						<div class="placeholder animate-pulse col-span-5 row-start-3" />
						<div class="placeholder animate-pulse col-span-4 row-start-4" />
					</div>
				</div>
			</section>
		{/key}
	{/each}
</div>
