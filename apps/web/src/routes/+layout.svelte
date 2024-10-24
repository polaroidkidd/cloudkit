<script lang="ts">
	import '../app.postcss';

	import { Typography } from '@cloudkit/ui-core';

	import { IconDLE } from '@cloudkit/ui-core';
	import { setInitialClassState } from '@skeletonlabs/skeleton';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}
	<link rel="icon" type="image/svg" href="/favicon.ico" />

	<title>cloudkit.FYI</title>
	<meta name="description" content="Find all your belongings without opening every box" />

	<link rel="canonical" href="https://cloudkit.fyi" />
	<script defer data-domain="cloudkit.fyi" src="https://brain.dle.dev/js/script.js"></script>
</svelte:head>

<main class="container max-w-6xl mt-20 px-5 mx-auto mb-10">
	<QueryClientProvider client={data.queryClient}>
		<slot />
		<SvelteQueryDevtools />
	</QueryClientProvider>
</main>
<footer class="w-full flex items-center justify-center container max-w-6xl mx-auto">
	<div class=" px-4 flex flex-col max-w-4xl w-full">
		<div class="flex-col flex divide-y divide-red-400">
			<span />
			<div class="hidden md:flex py-4 justify-between items-end">
				<IconDLE class="w-7 h-7 fill-red-400" />

				<a href="https://dle.dev" class="hidden md:block cursor-pointer">
					<Typography class="hover:text-red-400 uppercase">About</Typography>
				</a>
				<a href="https://dle.dev/blog" class="hidden md:block cursor-pointer">
					<Typography class="hover:text-red-400 uppercase">Blog</Typography>
				</a>
				<a href="https://dle.dev/cv" class="hidden md:block cursor-pointer">
					<Typography class="hover:text-red-400 uppercase">CV</Typography>
				</a>
				<Typography class="hover:text-red-400">&copy; 2024</Typography>
			</div>
		</div>
	</div>
</footer>
