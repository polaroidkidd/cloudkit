<script lang="ts">
	import { browser } from '$app/environment';
	import { initUserStore } from '$lib/stores/index';
	import { MODAL_PROTECTED } from '@cloudkit/ui-core';

	import ErrorModal from '@components/organisms/modals/error-modal.svelte';
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
		Modal,
		storePopup,
		Toast,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow, autoPlacement });

	initUserStore({
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

	const modalComponentRegistry: Record<MODAL_PROTECTED, ModalComponent> = {
		[MODAL_PROTECTED.CREATE_ERROR]: {
			ref: ErrorModal
		}
	};

	$: if (data.pathname) {
		drawerStore.close();
	}
</script>

<Modal components={modalComponentRegistry} regionBackdrop="backdrop-blur-lg" />
<QueryClientProvider client={queryClient}>
	<ProtectedNavbar />

	<slot />

	<Toast position="b" rounded="rounded-full" />
	<SvelteQueryDevtools />
</QueryClientProvider>
