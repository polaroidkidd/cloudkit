<script lang="ts">
	import classNames from 'classnames';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';

	const modalStore = getModalStore();

	function dismiss() {
		modalStore.clear();
	}
</script>

<div
	class={classNames(
		'p-4',
		'relative scroll-p-8 -m-4 rounded-none mt-16 w-modal',
		'md:dark:bg-surface-800 md:rounded-lg md:pt-10 md:m-0 md:h-min md:bg-surface-300 md:mt-0',
		'inline-flex gap-4 flex-col '
	)}
>
	<img src="/icons/alert.svg" class="w-12 h-12 mx-auto" alt="" />

	<p class="text-3xl text-center pb-4">
		Something went wrong while trying to process your request. Please try again later.
	</p>

	<SimpleButton on:click={dismiss} class="w-24 ml-auto">Ok</SimpleButton>
</div>
