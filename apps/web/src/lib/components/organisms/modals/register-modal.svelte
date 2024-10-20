<script lang="ts">
	import { Button, isDevOrCi, TextInput } from '@cloudkit/ui-core';

	import { convertFileToBase64, IconCheckTrue, IconLoading, IconUpload } from '@cloudkit/ui-core';
	import { RegisterUserSchema } from '@lib/client/auth/schemas';
	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';
	import classNames from 'classnames';
	import { onMount } from 'svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms/client';

	import { createQuery } from '@tanstack/svelte-query';
	export let formData: SuperValidated<Infer<typeof RegisterUserSchema>>;

	const modalStore = getModalStore();
	let isSubmitting = false;

	const { form, errors, enhance, validateForm } = superForm(formData, {
		validationMethod: 'onblur',
		SPA: true,

		validators: zodClient(RegisterUserSchema),
		clearOnSubmit: 'none',
		taintedMessage: null,
		multipleSubmits: 'abort',
		onUpdate: async () => {
			const { valid } = await validateForm();
			if (valid) {
				createQuery({
					queryKey: ['USER'],

					queryFn: async () => {}
				});
			}
		}
	});

	function closeModal() {
		modalStore.clear();
		document?.body.classList.remove('overflow-hidden');
	}
	let fileList: FileList;

	async function processImage(file: File) {
		if (fileList !== undefined) {
			$form.avatar = await convertFileToBase64(file);
		}
	}

	$: if (fileList !== undefined && fileList.length > 0) {
		processImage(fileList[0]);
	}
	onMount(() => {
		if (isDevOrCi) {
			$form.avatar = '';
			$form.lastName = 'test123@dle.dev';
			$form.firstName = 'test123@dle.dev';
			$form.email = 'test123@dle.dev';
			$form.password = 'test123@dle.dev';
			$form.confirmPassword = 'test123@dle.dev';
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
			disabled={isSubmitting}
			on:click={closeModal}
			variant="warning"
		>
			Cancel
		</Button>
		<Button type="submit" variant="tertiary" disabled={isSubmitting} ariaLabel="Confirm Signing Up">
			{#if isSubmitting}
				<IconLoading class="h-6" />
			{:else}
				Register
			{/if}
		</Button>
	</div>
</form>
