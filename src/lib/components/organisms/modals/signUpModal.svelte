<script lang="ts" context="module">
</script>

<script lang="ts">
	import Text from '@components/atoms/forms/text.svelte';
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';

	import { FileDropzone, getModalStore } from '@skeletonlabs/skeleton';

	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';
	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import IconUpload from '@components/atoms/icons/IconUpload.svelte';
	import { signUpSchema, type SignUpSchema } from '@lib/schemas/forms';
	import { convertFileToBase64 } from '@lib/utils/bufferUtils';
	import type { ActionResult } from '@sveltejs/kit';
	import classNames from 'classnames';
	import { getErrorModal } from './modalUtils';

	export let formData: SuperValidated<SignUpSchema>;
	const modalStore = getModalStore();
	let isSubmitting = false;

	const { form, errors, enhance } = superForm<ZodValidation<SignUpSchema>>(formData, {
		validationMethod: 'onblur',
		defaultValidator: 'keep',
		validators: signUpSchema,
		clearOnSubmit: 'none',
		taintedMessage: null,
		multipleSubmits: 'abort',
		onSubmit: async ({ formData }) => {
			if (fileList === undefined) {
				const resp = await fetch('https://picsum.photos/736');
				const image = (await resp.blob()) as unknown as File;
				formData.set('avatar', image);
			} else {
				formData.set('avatar', fileList[0]);
			}
			$form.imgVariations.forEach((logo) => formData.append('imgVariations', logo));
			isSubmitting = true;
		},
		onResult: ({ result }) => {
			isSubmitting = false;
			if (result.status === 503) {
				modalStore.clear();
				let message = result as ActionResult & { data: { message: string } };
				modalStore.trigger(getErrorModal(message.data.message));
			} else if (result.status === 302) {
				modalStore.clear();
				document?.body.classList.remove('overflow-hidden');
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
</script>

<form
	action="?/signUp"
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
	<Text
		type="email"
		fieldName="email"
		labelText="Email"
		bind:value={$form.email}
		invalidData={$errors.email?.toString()}
	/>
	<Text
		type="text"
		fieldName="firstName"
		labelText="First Name"
		bind:value={$form.firstName}
		invalidData={$errors.firstName?.toString()}
	/>
	<Text
		type="text"
		fieldName="lastName"
		labelText="Last Name"
		bind:value={$form.lastName}
		invalidData={$errors.lastName?.toString()}
	/>

	<Text
		type="password"
		fieldName="password"
		labelText="Password"
		bind:value={$form.password}
		invalidData={$errors.password?.toString()}
	/>
	<Text
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
				<IconUpload />
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
			<div>Allowed Filetypes: <strong>*.jpg, *.webp, *.png</strong></div>
			<div>
				If you don't select one, I'll grab a random one from <a href="https://picsum.photos"
					>Picsum</a
				>
			</div>
		</svelte:fragment>
	</FileDropzone>
	<div class="flex justify-around pt-5">
		<SimpleButton
			type="reset"
			ariaLabel="Close Contact Modal"
			disabled={isSubmitting}
			on:click={closeModal}
		>
			Cancel
		</SimpleButton>
		<SimpleButton type="submit" disabled={isSubmitting} ariaLabel="Confirm Signing Up">
			{#if isSubmitting}
				<IconLoading class="fill-primary-500" />
			{:else}
				Sign Up
			{/if}
		</SimpleButton>
	</div>
</form>
