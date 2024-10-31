<script lang="ts">
	import {
		Avatar,
		EditUserSchema,
		getErrorModal,
		IconCheckFalse,
		IconCheckTrue,
		IconEdit,
		IconLoading,
		PATHS,
		TextEdit
	} from '@cloudkit/ui-core';
	import { getUserStore } from '@lib/stores';

	import { convertFileToBase64, FORM_ACTIONS } from '@cloudkit/ui-core';
	import type { ActionResult } from '@sveltejs/kit';
	import classNames from 'classnames';

	import { goto, invalidateAll } from '$app/navigation';
	import { Button, openConfirmationModal } from '@cloudkit/ui-core';
	import { UserApiService } from '@lib/api/user-service-api';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { createMutation } from '@tanstack/svelte-query';
	import { zod } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';

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

	export let editUserForm;

	const userStore = getUserStore<{ isBase64: boolean }>({ isBase64: false });

	const { form, enhance, errors, tainted } = superForm(editUserForm, {
		validationMethod: 'onblur',
		validators: zod(EditUserSchema),
		clearOnSubmit: 'none',
		taintedMessage: null,
		multipleSubmits: 'abort',

		onSubmit: ({ formData }) => {
			if (fileList) {
				formData.set('avatar', fileList[0]);
			}

			isLoading = true;
		},
		onResult: ({ result }: { result: ActionResult }) => {
			isLoading = false;
			fileSelected = false;
			if (result.type === 'success') {
				userStore.update((cs) => ({
					...cs,
					isBase64: false,
					avatar: result.data?.editUserForm.data.avatar
				}));
				invalidateAll();
			}
		}
	});

	let isLoading = false;
	let fileList: FileList;
	let fileSelected = false;
	let previousAvatar = $userStore.avatar;
	function cancelAvatarEdit() {
		userStore.update((cs) => ({
			...cs,
			isBase64: false,
			avatar: previousAvatar
		}));
		fileSelected = false;
	}
	async function processImage(file: File) {
		if (fileList !== undefined) {
			isLoading = true;

			$form.avatar = await convertFileToBase64(file);
			previousAvatar = $userStore.avatar;
			userStore.update((cs) => ({
				...cs,
				isBase64: true,
				...(cs.avatar && { avatar: { ...cs.avatar, url: $form.avatar } })
			}));
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
		$userStore.isBase64
	].some(Boolean);
	const modalStore = getModalStore();

	const deleteUserMutation = createMutation({
		mutationFn: async () => {
			await UserApiService.deleteCurrentUser();
		},
		onError: () => {
			modalStore.clear();
			modalStore.trigger(
				getErrorModal('Something went wrong. Please try again. If the error persists')
			);
		},
		onSuccess: () => {
			goto(PATHS.ROOT);
		},
		onSettled: () => {
			document?.body.classList.remove('overflow-hidden');
		}
	});

	function openConfirm() {
		openConfirmationModal({
			title: 'Confirm',
			body: 'Are you sure you want to delete your account? This cannot be undone.',
			callback: async (r: unknown) => {
				if (r) {
					$deleteUserMutation.mutate();
				}
			},
			modalStore
		});
	}
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
	action={FORM_ACTIONS.UPDATE_USER}
	method="POST"
	enctype="multipart/form-data"
>
	<div class="relative mb-10 mt-4">
		<Avatar
			isLarge={true}
			src={$userStore.avatar?.url ?? ''}
			isBase64={$userStore.isBase64}
			updatedAt={$userStore.avatar?.updatedAt ?? new Date()}
		/>
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
	<h4 class="h4 py-1 ml-auto mb-5">
		Member since {monthNames[new Date($userStore.createdAt).getMonth()]}
		{new Date($userStore.createdAt).getFullYear()}
	</h4>
	<div class="flex justify-between items-center py-1">
		<h3 class="h3">Verification Status</h3>
		<div class="ml-5">
			{#if $userStore.verified}
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
	<Button {disabled} type="submit" class="mb-5">Save All Changes</Button>
</form>
<div
	class={classNames(
		// Small Mobile
		'flex flex-col  items-stretch gap justify-center mx-auto',
		// min: 640px
		'sm:w-3/4 ',
		// min-768px
		'md:w-1/2'
	)}
>
	<Button variant="error" fill="ghost" on:click={openConfirm}>Delete Account</Button>
</div>
