<script lang="ts">
	import { getModalStore, LightSwitch } from '@skeletonlabs/skeleton';

	import classNames from 'classnames';

	import { Button, Typography } from '@cloudkit/ui-core';
	import { isDevOrCi } from '@cloudkit/ui-core';
	import { registerModalConfig, authenticateModalConfig } from '@cloudkit/ui-core';

	const modalStore = getModalStore();

	function openLogInModal() {
		document?.body.classList.add('overflow-hidden');
		modalStore.trigger(authenticateModalConfig);
	}

	function openRegistrationModal() {
		document?.body.classList.add('overflow-hidden');
		modalStore.trigger(registerModalConfig);
	}
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
	<div class=" mx-auto my-2 container max-w-6xl navbarContainer flex items-center px-5">
		<LightSwitch class="ml-5" />
		<Button fill="filled" variant="tertiary" on:click={openLogInModal} class="my-1 ml-auto">
			<Typography>Sign In</Typography>
		</Button>
		{#if isDevOrCi}
			<Button fill="filled" variant="tertiary" on:click={openRegistrationModal} class="my-1 ml-2">
				<Typography>Register</Typography>
			</Button>
		{/if}
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
