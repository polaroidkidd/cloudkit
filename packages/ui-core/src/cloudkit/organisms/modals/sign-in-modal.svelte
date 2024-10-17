<script lang="ts" context="module">
</script>

<script lang="ts">
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	import Text from '@components/atoms/forms/text.svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';

	import classNames from 'classnames';
	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';
	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import { signInSchema, type SignInSchema } from '@lib/schemas/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import { getErrorModal } from './modalUtils';
	import { logInModalConfig } from './modalConfigs';

	export let formData: SuperValidated<SignInSchema>;
	const modalStore = getModalStore();
	let isSubmitting = false;

	const { form, errors, enhance } = superForm<ZodValidation<SignInSchema>>(formData, {
		validationMethod: 'onblur',
		defaultValidator: 'keep',
		validators: signInSchema,
		taintedMessage: null,
		multipleSubmits: 'abort',
		onSubmit: () => {
			isSubmitting = true;
		},
		onResult: ({ result }) => {
			isSubmitting = false;
			if (result.status === 400) {
				modalStore.clear();
				let message = result as ActionResult & { data: { message: string } };
				modalStore.trigger(getErrorModal(message.data.message));
				modalStore.trigger(logInModalConfig);
			} else {
				modalStore.clear();
				document?.body.classList.remove('overflow-hidden');
			}
		}
	});

	function closeModal() {
		modalStore.clear();
		document?.body.classList.remove('overflow-hidden');
	}
</script>

<form
	action="/?/signIn"
	use:enhance
	method="POST"
	class={classNames(
		'px-8',
		'pt-6',
		'pb-8',
		'relative scroll-p-8 -m-4 rounded-none mt-16 w-modal',
		'md:dark:bg-surface-800 md:rounded-lg md:pt-10 md:m-0 md:h-min md:bg-surface-300 md:mt-0'
	)}
>
	<Text
		type="text"
		fieldName="email"
		labelText="E-Mail"
		bind:value={$form.email}
		invalidData={$errors.email?.toString()}
	/>

	<Text
		type="password"
		fieldName="password"
		labelText="Password"
		bind:value={$form.password}
		invalidData={$errors.password?.toString()}
	/>

	<div class="flex justify-around pt-5">
		<SimpleButton
			type="reset"
			ariaLabel="Close Contact Modal"
			disabled={isSubmitting}
			on:click={closeModal}
		>
			Cancel
		</SimpleButton>
		<SimpleButton type="submit" disabled={isSubmitting} ariaLabel="Confirm Sign In">
			{#if isSubmitting}
				<IconLoading class="h-6 fill-red-950" />
			{:else}
				Sign In
			{/if}
		</SimpleButton>
	</div>
</form>
