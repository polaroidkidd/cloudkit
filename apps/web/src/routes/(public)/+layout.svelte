<script lang="ts">
	import ErrorModal from '@components/organisms/modals/error-modal.svelte';
	import PublicNavbar from '@components/organisms/navbar/public-navbar.svelte';
	import {
		getDrawerStore,
		initializeStores,
		Modal,
		type ModalComponent
	} from '@skeletonlabs/skeleton';

	import { MODAL_PUBLIC } from '@cloudkit/ui-core';
	import SignInModal from '@components/organisms/modals/authenticate-modal.svelte';
	import RegisterModal from '@components/organisms/modals/register-modal.svelte';
	import type { LayoutData } from './$types';

	initializeStores();

	export let data: LayoutData;
	const modalComponentRegistry: Record<MODAL_PUBLIC, ModalComponent> = {
		[MODAL_PUBLIC.REGISTER]: {
			ref: RegisterModal,
			props: { formData: data.register }
		},
		[MODAL_PUBLIC.LOG_IN]: {
			ref: SignInModal,
			props: { formData: data.authenticate }
		},
		[MODAL_PUBLIC.CREATE_ERROR]: {
			ref: ErrorModal
		}
	};

	const drawerStore = getDrawerStore();
	$: if (data.pathname) {
		drawerStore.close();
	}
</script>

<PublicNavbar />
<slot />

<Modal components={modalComponentRegistry} regionBackdrop="backdrop-blur-lg" />
