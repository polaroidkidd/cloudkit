<script lang="ts">
	import {
		Button,
		IconCheckTrue,
		IconLoading,
		IconUpload,
		isDevOrCi,
		TextInput
	} from '@cloudkit/ui-core';
	import { AuthApiService } from '@lib/api/auth-service-api';
	import { RegisterUserSchema } from '@lib/client/auth/schemas';
	import { fetchRandomAvatarQueryConfig } from '@lib/queries/fetch-random-avatar-query-config';
	import { AxiosError } from 'axios';

	import { getUserStore } from '@lib/stores';
	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';
	import { createMutation, createQuery } from '@tanstack/svelte-query';
	import classNames from 'classnames';
	import { onMount } from 'svelte';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let formData: SuperValidated<Infer<typeof RegisterUserSchema>>;
	const userStore = getUserStore();
	const modalStore = getModalStore();
	const fetchRandomAvatarQuery = createQuery(fetchRandomAvatarQueryConfig);
	const createUserMutation = createMutation({
		mutationFn: async (form: SuperValidated<Infer<typeof RegisterUserSchema>>) => {
			return AuthApiService.createNewUser(form.data);
		},

		onError: async ({ response }: AxiosError) => {
			if (response?.status === 409) {
				return { status: response.status };
			}
			$createUserMutation.reset();
		},
		onSuccess: ({ data }) => {
			userStore.set(data);
			closeModal();
		}
	});
	const { mutateAsync: createUser } = $createUserMutation;

	const { form, errors, enhance, validateForm } = superForm(formData, {
		validationMethod: 'onblur',
		SPA: true,

		validators: zodClient(RegisterUserSchema),
		clearOnSubmit: 'none',
		taintedMessage: null,
		multipleSubmits: 'abort',
		onUpdate: async ({ form }) => {
			const { valid } = await validateForm();
			if (valid) {
				if (!form.data.avatar) {
					const { data: converted } = await $fetchRandomAvatarQuery.refetch();
					if (converted) {
						form.data.avatar = converted;
					}
				}
				try {
					await createUser(form);
				} catch (e) {
					if (e instanceof AxiosError) {
						if (e.status === 409) {
							setError(form, 'email', 'Email Already Taken');
						}
					}
				}
			}
		}
	});

	function closeModal() {
		modalStore.clear();
		document?.body.classList.remove('overflow-hidden');
	}

	let fileList: FileList;

	onMount(() => {
		if (isDevOrCi) {
			$form.lastName = 'Daniel';
			$form.firstName = 'Tester';
			$form.email = 'test123@dle.dev';
			$form.password = 'password';
			$form.confirmPassword = 'password';
		}
	});
</script>

<form
	use:enhance
	method="POST"
	enctype="multipart/form-data"
	class={classNames(
		'px-8',
		'pt-6',
		'pb-8',
		'relative scroll-p-8 -m-4 rounded-none mt-16 w-modal',
		'md:dark:bg-surface-800 md:rounded-lg md:pt-10 md:m-0 md:h-min md:bg-surface-300 md:mt-0'
	)}
>
	<TextInput
		type="email"
		fieldName="email"
		labelText="Email"
		bind:value={$form.email}
		invalidData={$errors.email?.toString()}
	/>
	<TextInput
		type="text"
		fieldName="firstName"
		labelText="First Name"
		bind:value={$form.firstName}
		invalidData={$errors.firstName?.toString()}
	/>
	<TextInput
		type="text"
		fieldName="lastName"
		labelText="Last Name"
		bind:value={$form.lastName}
		invalidData={$errors.lastName?.toString()}
	/>

	<TextInput
		type="password"
		fieldName="password"
		labelText="Password"
		bind:value={$form.password}
		invalidData={$errors.password?.toString()}
	/>
	<TextInput
		type="password"
		fieldName="confirmPassword"
		labelText="Confirm Password"
		bind:value={$form.confirmPassword}
		invalidData={$errors.confirmPassword?.toString()}
	/>
	<FileDropzone
		allowDuplicates={false}
		name="logo"
		bind:files={fileList}
		accept="image/png, image/jpeg, image/webp"
		class="mt-5"
	>
		<svelte:fragment slot="lead">
			<div class="flex justify-center">
				{#if fileList}
					<IconCheckTrue />
				{:else}
					<IconUpload />
				{/if}
			</div>
		</svelte:fragment>
		<svelte:fragment slot="message">
			{#if fileList}
				{fileList[0].name}
			{:else}
				Upload your avatar
			{/if}
		</svelte:fragment>
		<svelte:fragment slot="meta">
			<div>
				Allowed Filetypes: <strong>*.jpg, *.webp, *.png</strong>
			</div>
			<div>
				If you don't select one, I'll grab a random one from <a href="https://picsum.photos">
					Picsum
				</a>
			</div>
		</svelte:fragment>
	</FileDropzone>
	<div class="flex justify-around pt-5">
		<Button
			type="reset"
			ariaLabel="Close Contact Modal"
			disabled={$createUserMutation.isPending}
			on:click={closeModal}
			variant="warning"
		>
			Cancel
		</Button>
		<Button
			type="submit"
			variant="tertiary"
			disabled={$createUserMutation.isPending}
			ariaLabel="Confirm Signing Up"
		>
			{#if $createUserMutation.isPending}
				<IconLoading class="h-6" />
			{:else}
				Register
			{/if}
		</Button>
	</div>
</form>
