<script lang="ts">
	import { browser } from '$app/environment';
	import { initUserStore } from '$lib/stores/index';
	import { type User } from '@cloudkit/ui-core';
	import ProtectedNavbar from '@components/organisms/navbar/protected-navbar.svelte';
	import {
		arrow,
		autoPlacement,
		autoUpdate,
		computePosition,
		flip,
		offset,
		shift
	} from '@floating-ui/dom';
	import {
		getDrawerStore,
		initializeStores,
		storePopup,
		Toast
	} from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	import type { LayoutData } from './$types';
	export let data: LayoutData;

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, autoPlacement });

	initUserStore<User>({
		...data.user,
		...(data.user?.avatar && {
			...data.user.avatar
		})
	});


	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	const drawerStore = getDrawerStore();


	$: if (data.pathname) {
		drawerStore.close();
	}
</script>

<QueryClientProvider client={queryClient}>
	<ProtectedNavbar />

	<slot />


	<Toast position="b" rounded="rounded-full" />
	<SvelteQueryDevtools />
</QueryClientProvider>
