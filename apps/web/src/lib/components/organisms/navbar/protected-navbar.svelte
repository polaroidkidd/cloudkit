<script lang="ts">
	import { goto } from '$app/navigation';
	import { Avatar, Button, IconMenu, PATHS } from '@cloudkit/ui-core';
	import { Drawer, type DrawerSettings, getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';
	import { createMutation } from '@tanstack/svelte-query';
	import classNames from 'classnames';

	import { getUserStore } from '@lib/stores';

	import { NavigationButton, Typography } from '@cloudkit/ui-core';

	import { IconLoading } from '@cloudkit/ui-core';
	import { AuthApiService } from '@lib/api/auth-service-api';

	const drawerStore = getDrawerStore();

	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		width: 'w-[200px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};

	// Open the drawer:
	function open(): void {
		drawerStore.open(drawerSettings);
	}

	const user = getUserStore<{ isBase64: boolean }>();

	const deleteSessionMutation = createMutation({
		mutationFn: async () => {
			return AuthApiService.deleteSession();
		},
		onError: (error) => {
			console.error('error: ', error);
		},
		onSuccess: () => {
			goto(PATHS.ROOT);
		}
	});
</script>

<nav
	class={classNames(
		'fixed',
		'top-0',
		'left-0',
		'right-0',
		'z-50',
		'text-base sm:text-xl',
		'print:hidden bg-slate-500 bg-opacity-10 shadow-md'
	)}
>
	<div class=" mx-auto container max-w-6xl navbarContainer flex items-center px-5">
		<a href={PATHS.PROFILE} class="flex h-full justify-center items-center py-1">
			<Avatar
				border="border-2 border-surface-300-600-token hover:!border-primary-500 mb-0"
				width="w-10"
				initials={`${$user.firstName?.slice(0, 1)}${$user.lastName?.slice(0, 1)}`}
				src={$user.avatar?.url ?? ''}
				isBase64={$user.isBase64}
				updatedAt={$user.avatar?.updatedAt ?? new Date()}
			/>
		</a>

		<LightSwitch class="ml-auto mr-5" />
		<button type="button" class="btn-icon btn-icon-sm variant-filled" on:click={open}>
			<IconMenu />
		</button>
		<Drawer position="right">
			<div class="flex flex-col gap-5 p-4 h-full">
				<NavigationButton variant="tertiary" fill="ghost" href={PATHS.PROFILE}>
					Profile
				</NavigationButton>

				<Button
					disabled={$deleteSessionMutation.isPending}
					class="w-full"
					fill="ghost"
					variant="warning"
					on:click={() => $deleteSessionMutation.mutate()}
				>
					{#if $deleteSessionMutation.isPending}
						<IconLoading class="h-6 fill-surafce dark:fill-surface-50" />
					{:else}
						<Typography>Sign Out</Typography>
					{/if}
				</Button>
			</div>
		</Drawer>
	</div>
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
			// background-color: red;
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
