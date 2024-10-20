<script lang="ts" context="module">
</script>

<script lang="ts">
	import { Button, FORM_ACTIONS, TextInput } from '@cloudkit/ui-core';

	import { IconLoading } from '@cloudkit/ui-core';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import classNames from 'classnames';
	import { onMount } from 'svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';

	import { Typography } from '@cloudkit/ui-core';

	import { authenticateModalConfig, getErrorModal, isDevOrCi } from '@cloudkit/ui-core';
	import { AuthenticateUserSchema } from '@lib/client/auth/schemas';
	import { valibot } from 'sveltekit-superforms/adapters';

	export let formData: SuperValidated<Infer<typeof AuthenticateUserSchema>>;
	const modalStore = getModalStore();
	let isSubmitting = false;
	const { form, errors, enhance } = superForm(formData, {
		validationMethod: 'onblur',
		validators: valibot(AuthenticateUserSchema),
		taintedMessage: null,
		multipleSubmits: 'abort',
		onSubmit: () => {
			isSubmitting = true;
		},
		onResult: ({ result }) => {
			if (result.status !== 204) {
				isSubmitting = false;
				modalStore.clear();
				let message = result as ActionResult & { data: { form: { message: string } } };
				modalStore.trigger(getErrorModal(message.data.form.message));
				modalStore.trigger(authenticateModalConfig);
			}
		}
	});

	function closeModal() {
		modalStore.clear();
		document?.body.classList.remove('overflow-hidden');
	}

	if (isDevOrCi) {
		onMount(() => {
			$form.email = 'test123@dle.dev';
			$form.password = 'test123@dle.dev';
		});
	}
</script>

<form
	action={FORM_ACTIONS.LOGIN}
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
	<TextInput
		type="text"
		fieldName="email"
		labelText="E-Mail"
		bind:value={$form.email}
		invalidData={$errors.email?.toString()}
	/>

	<TextInput
		type="password"
		fieldName="password"
		labelText="Password"
		bind:value={$form.password}
		invalidData={$errors.password?.toString()}
	/>

	<div class="flex justify-around pt-5">
		<Button
			type="reset"
			ariaLabel="Close Contact Modal"
			disabled={isSubmitting}
			on:click={closeModal}
			variant="warning"
		>
			Cancel
		</Button>
		<Button type="submit" disabled={isSubmitting} ariaLabel="Confirm Sign In" variant="tertiary">
			{#if isSubmitting}
				<IconLoading class="h-6" />
			{:else}
				<Typography>Sign In</Typography>
			{/if}
		</Button>
	</div>
</form>
