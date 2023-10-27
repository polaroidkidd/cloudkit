<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		Modal,
		Toast,
		getDrawerStore,
		storePopup,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';

	import ErrorModal from '@components/organisms/modals/errorModal.svelte';
	import SignInModal from '@components/organisms/modals/signInModal.svelte';
	import SignUpModal from '@components/organisms/modals/signUpModal.svelte';
	import Navbar from '@components/organisms/navbar.svelte';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';

	initializeStores();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	export let data: LayoutData;
	const modalComponentRegistry: Record<string, ModalComponent> = {
		signUp: {
			ref: SignUpModal,
			props: { formData: data.signUp }
		},
		logIn: {
			ref: SignInModal,
			props: { formData: data.logIn }
		},
		createError: {
			ref: ErrorModal
		}
	};

	const drawerStore = getDrawerStore();
	$: if (data.pathname) {
		drawerStore.close();
	}
</script>

<Navbar user={data.user} />
<div class="container max-w-6xl pt-24 px-5 h-full mx-auto">
	<slot />
</div>

<Toast position="t" />

<Modal components={modalComponentRegistry} regionBackdrop="backdrop-blur-lg" />
