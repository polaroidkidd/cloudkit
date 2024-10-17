<script lang="ts">
	import classNames from 'classnames';

	import { enhance } from '$app/forms';
	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';
	import IconCheckFalse from '@components/atoms/icons/IconCheckFalse.svelte';
	import IconMenu from '@components/atoms/icons/IconMenu.svelte';
	import Avatar from '@components/atoms/media/avatar.svelte';
	import type { IUserRepository, UserRepositoryMethods } from '@lib/utils/RepositoryMethods';
	import {
		Drawer,
		LightSwitch,
		getDrawerStore,
		getModalStore,
		type DrawerSettings
	} from '@skeletonlabs/skeleton';
	import { logInModalConfig as signInModalConfig, signUpModalConfig } from './modals/modalConfigs';
	import NavbarLink from '@components/atoms/nav/navbarLink.svelte';

	const drawerStore = getDrawerStore();
	const modalStore = getModalStore();
	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};

	export let user: IUserRepository[UserRepositoryMethods.FindUserById] | undefined;

	function openSignUpModal() {
		document?.body.classList.add('overflow-hidden');
		modalStore.trigger(signUpModalConfig);
	}

	function openLogInModal() {
		document?.body.classList.add('overflow-hidden');
		modalStore.trigger(signInModalConfig);
	}

	// Open the drawer:
	function open(): void {
		drawerStore.open(drawerSettings);
	}

	// Close the drawer:
	function close(): void {
		drawerStore.close();
	}
</script>

<nav
	class={classNames(
		'container max-w-6xl',
		'mx-auto',

		'px-5',
		'h-20',
		'fixed',
		'top-0',
		'left-0',
		'right-0',
		'z-50',
		'text-base sm:text-xl',
		'print:hidden',
		'navbarContainer',
		'flex',
		'items-center'
	)}
>
	{#if user === undefined}
		<NavbarLink target="/users" text="Demo Users" />
		<SimpleButton on:click={openLogInModal} class="ml-auto">Sign In</SimpleButton>
		<SimpleButton on:click={openSignUpModal} class="ml-5">Sign Up</SimpleButton>
		<LightSwitch class="ml-5" />
	{:else}
		<a href="/home">
			<Avatar
				border="border-2 border-surface-300-600-token hover:!border-primary-500"
				width="w-10"
				initials={`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}
				src={user.avatar.url}
			/>
		</a>
		<NavbarLink target="/users" text="Demo Users" />

		<LightSwitch class="ml-auto" />
		<button on:click={open}><IconMenu /></button>
		<Drawer position="right">
			<div class="flex flex-col gap-5 p-4 h-full">
				<div class="flex">
					<a class="anchor" href="/home">Home</a>

					<button class="ml-auto" on:click={close}><IconCheckFalse /></button>
				</div>

				<form action="home?/signOut" use:enhance method="POST">
					<SimpleButton class="w-full">Sign Out</SimpleButton>
				</form>
				<form action="home?/deleteAccount" class="mt-auto" method="POST">
					<SimpleButton class="w-full variant-soft-error" ariaLabel="Delete Account"
						>Delete Account</SimpleButton
					>
				</form>
			</div>
		</Drawer>
	{/if}
</nav>

<style lang="scss">
	.blogItems {
		transition: max-height 500ms;
	}

	.navbarContainer {
		&::before {
			z-index: -1;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100vw;
			backdrop-filter: blur(10px);
		}
	}

	.menuBlockFrostedGlass {
		&::before {
			z-index: -1;
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100vw;
			backdrop-filter: blur(10px);
			//background-color: red;
			//border: 2px solid red;
			//mask: linear-gradient(0deg, transparent, black 50%);
		}
	}

	.container {
		transition: max-height 0.2s ease-in-out;
		overflow: hidden;
	}

	.collapsed {
		max-height: 0;
	}

	.open {
		max-height: calc(3 * 42px);
	}
</style>
