<script lang="ts">
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import {
		AppShell,
		Modal,
		Toast,
		getDrawerStore,
		storePopup,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	import '../app.postcss';
	import Typography from '@components/atoms/typography/typography.svelte';
	import IconDle from '@components/icons/IconDle.svelte';
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

<AppShell>
	<svelte:fragment slot="header">
		<Navbar user={data.user} />
	</svelte:fragment>
	<div class="container max-w-6xl pt-24 px-5 mx-auto">
		<slot />
	</div>
	<footer
		class="w-full flex items-center justify-center container max-w-6xl mx-auto mb-12"
		slot="pageFooter"
	>
		<div class=" px-4 flex flex-col">
			<Typography variant="h2" size="3xl" class="mb-5 text-center">Ideas or Suggestions?</Typography
			>
			<Typography variant="h3" size="2xl">
				Reach out via Discussions, Tickts or Comments on <a
					class="anchor"
					href="https://github.com/polaroidkidd/cloudkit">Github</a
				></Typography
			>

			<div class="flex-col flex divide-y divide-red-400">
				<div class="hidden md:flex mt-24 justify-between items-end">
					<IconDle class="w-7 h-7 fill-red-400" />

					<a href="https://dle.dev" class="hidden md:block cursor-pointer">
						<Typography class="hover:text-red-400 uppercase">About</Typography>
					</a>
					<a href="https://dle.dev/blog" class="hidden md:block cursor-pointer">
						<Typography class="hover:text-red-400 uppercase">Blog</Typography>
					</a>
					<a href="https://dle.dev/cv" class="hidden md:block cursor-pointer">
						<Typography class="hover:text-red-400 uppercase">CV</Typography>
					</a>
				</div>

				<p class="w-full my-12 flex align-middle justify-center">
					<Typography class="pt-12"
						><a
							class="anchor"
							href="https://raw.githubusercontent.com/polaroidkidd/cloudkit/master/License"
							target="_blank">MIT License</a
						></Typography
					>
				</p>
			</div>
		</div>
	</footer>
</AppShell>

<Toast position="t" />

<Modal components={modalComponentRegistry} regionBackdrop="backdrop-blur-lg" />
