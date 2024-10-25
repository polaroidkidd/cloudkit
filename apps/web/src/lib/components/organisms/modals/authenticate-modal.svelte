<script lang="ts">
	import { Button, FORM_ACTIONS, getErrorModal, PATHS, TextInput } from '@cloudkit/ui-core';

	import { IconLoading } from '@cloudkit/ui-core';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import classNames from 'classnames';
	import { onMount } from 'svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';

	import { Typography } from '@cloudkit/ui-core';

	import { goto } from '$app/navigation';
	import { isDevOrCi } from '@cloudkit/ui-core';
	import { AuthApiService } from '@lib/api/auth-service-api';
	import { AuthenticateUserSchema } from '@lib/client/auth/schemas';
	import { getUserStore } from '@lib/stores';
	import { createMutation } from '@tanstack/svelte-query';
	import type { AxiosError } from 'axios';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { ZodError } from 'zod';

	export let formData: SuperValidated<Infer<typeof AuthenticateUserSchema>>;
	const modalStore = getModalStore();
	const userStore = getUserStore();

	const createNewSession = createMutation({
		mutationFn: async (form: SuperValidated<Infer<typeof AuthenticateUserSchema>>) => {
			return AuthApiService.createNewSession(form.data);
		},

		onError: async ({ response }: AxiosError<ZodError>) => {
			modalStore.close();
			if (response?.data.issues[0].message) {
				modalStore.trigger(getErrorModal(response?.data.issues[0].message));
			}
			$createNewSession.reset();
		},
		onSuccess: ({ data }) => {
			userStore.set(data);
			closeModal();
			goto(PATHS.PROFILE);
		}
	});

	const { form, errors, enhance, validateForm } = superForm(formData, {
		SPA: true,
		validationMethod: 'onblur',
		validators: zodClient(AuthenticateUserSchema),
		taintedMessage: null,
		multipleSubmits: 'abort',

		onUpdate: async ({ form }) => {
			const { valid } = await validateForm();
			if (valid) {
				await $createNewSession.mutateAsync(form);
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
			$form.password = 'password';
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
			disabled={$createNewSession.isPending}
			on:click={closeModal}
			variant="warning"
		>
			Cancel
		</Button>
		<Button
			type="submit"
			disabled={$createNewSession.isPending}
			ariaLabel="Confirm Sign In"
			variant="tertiary"
		>
			{#if $createNewSession.isPending}
				<IconLoading class="h-6" />
			{:else}
				<Typography>Sign In</Typography>
			{/if}
		</Button>
	</div>
</form>
