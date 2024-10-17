<script lang="ts">
	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';
	import IconCheckFalse from '@components/atoms/icons/IconCheckFalse.svelte';
	import IconCheckTrue from '@components/atoms/icons/IconCheckTrue.svelte';
	import IconEdit from '@components/atoms/icons/IconEdit.svelte';
	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import Avatar from '@components/atoms/media/avatar.svelte';
	import TextEdit from '@components/molecues/textEdit.svelte';
	import { editUserSchema, type EditUserSchema } from '@lib/schemas/forms';
	import { convertFileToBase64 } from '@lib/utils/bufferUtils';
	import type { IUserRepository, UserRepositoryMethods } from '@lib/utils/RepositoryMethods';
	import type { ActionResult } from '@sveltejs/kit';
	import classNames from 'classnames';
	import { writable } from 'svelte/store';
	import type { ZodValidation } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	export let editUserForm;
	export let userData: IUserRepository[UserRepositoryMethods.FindUserById];
	const user = writable({ ...userData, isBase64: false });
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const { form, enhance, errors, tainted } = superForm<ZodValidation<EditUserSchema>>(
		editUserForm,
		{
			validationMethod: 'onblur',
			defaultValidator: 'keep',
			validators: editUserSchema,
			clearOnSubmit: 'none',
			taintedMessage: null,
			multipleSubmits: 'abort',

			onSubmit: ({ formData }) => {
				formData.set('avatar', fileList[0]);
				isLoading = true;
			},
			onResult: ({ result }: { result: ActionResult }) => {
				isLoading = false;
				fileSelected = false;
				if (result.type === 'success') {
					user.update((cs) => ({
						...cs,
						isBase64: false,
						avatar: { url: result.data?.editUserForm.data.avatar }
					}));
				}
			}
		}
	);

	let isLoading = false;
	let fileList: FileList;
	let fileSelected = false;
	function cancelAvatarEdit() {
		user.update((cs) => ({ ...cs, isBase64: false, avatar: { url: userData.avatar.url } }));
		fileSelected = false;
	}

	async function processImage(file: File) {
		if (fileList !== undefined) {
			isLoading = true;

			$form.avatar = await convertFileToBase64(file);
			user.update((cs) => ({ ...cs, isBase64: true, avatar: { url: $form.avatar as string } }));
			isLoading = false;
		}
		fileSelected = true;
	}
	$: if (fileList !== undefined && fileList.length > 0) {
		processImage(fileList[0]);
	}

	$: disabled = ![
		$tainted?.email,
		$tainted?.firstName,
		$tainted?.lastName,
		isLoading,
		$user.isBase64
	].some(Boolean);
</script>

<form
	class={classNames(
		// Small Mobile
		'flex flex-col  items-stretch gap justify-center mx-auto',
		// min: 640px
		'sm:w-3/4 ',
		// min-768px
		'md:w-1/2'
	)}
	use:enhance
	on:submit|preventDefault
	action="?/updateUser"
	method="POST"
	enctype="multipart/form-data"
>
	<div class="relative mb-10 mt-4">
		<Avatar isLarge={true} src={$user.avatar.url} isBase64={$user.isBase64} />
		<label for="file-upload" class="absolute -bottom-3 right-0">
			{#if isLoading}
				<IconLoading class="w-6 h-6" />
			{:else if fileSelected}
				<button on:click={cancelAvatarEdit}>
					<IconCheckFalse />
				</button>
			{:else}
				<div class="cursor-pointer">
					<IconEdit />
				</div>
			{/if}
			<input
				bind:files={fileList}
				id="file-upload"
				class="hidden"
				type="file"
				accept="image/png, image/jpeg, image/webp"
				name="avatar"
			/>
		</label>
	</div>
	<div class="flex justify-between items-center py-1">
		<h3 class="h3">Verification Status</h3>
		<div class="ml-5">
			{#if $user.verified}
				<IconCheckTrue />
			{:else}
				<IconCheckFalse />
			{/if}
		</div>
	</div>
	<div class="py-1 mt-auto">
		<h3 class="h3">
			<TextEdit
				invalidData={$errors.firstName?.toString()}
				name="firstName"
				{isLoading}
				bind:value={$form.firstName}
			/>
		</h3>
	</div>
	<div class="py-1">
		<h3 class="h3">
			<TextEdit
				invalidData={$errors.lastName?.toString()}
				name="lastName"
				{isLoading}
				bind:value={$form.lastName}
			/>
		</h3>
	</div>
	<div class="py-1 mb-5">
		<h3 class="h3">
			<TextEdit
				invalidData={$errors.email?.toString()}
				name="email"
				{isLoading}
				bind:value={$form.email}
			/>
		</h3>
	</div>
	<SimpleButton {disabled} type="submit" class="button mb-10">Save All Changes</SimpleButton>

	<h4 class="h4 py-1 ml-auto mt-auto">
		Member since {monthNames[new Date($user.createdAt).getMonth()]}
		{new Date($user.createdAt).getFullYear()}
	</h4>
</form>
