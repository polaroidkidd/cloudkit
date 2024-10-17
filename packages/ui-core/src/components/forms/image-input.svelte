<script lang="ts">
	import { IconLoading } from '@cloudkit/ui-core';
	import {Typography} from '@cloudkit/ui-core';
	import { PATHS } from '@cloudkit/ui-core';

	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { clearCache } from '@cloudkit/ui-core';
	import { Card } from '@cloudkit/ui-core';
	import { IconCheckTrue, IconUpload } from '@cloudkit/ui-core';
	import { getErrorModal } from '@cloudkit/ui-core';

	import { UPLOAD_FILTERS, UPLOAD_OPTIONS } from '@cloudkit/ui-core';
	import { SERVER_FORM_ACTIONS } from '@cloudkit/ui-core';
	import { ItemsWithCollectionSchema } from '@cloudkit/ui-core';
	import { FileDropzone, getModalStore, ProgressBar } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import imageCompression from 'browser-image-compression';
	import classNames from 'classnames';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { twMerge } from 'tailwind-merge';

	const modalStore = getModalStore();

	export let formData: SuperValidated<Infer<typeof ItemsWithCollectionSchema>>;
	let imageCompressionProgress = 0;
	let imageCompressionTotal = 0;
	let isCompressing = false;
	let isSubmitting = false;
	let fileList: FileList | undefined = undefined;

	const { form, enhance } = superForm(formData, {
		validationMethod: 'onblur',
		validators: zod(ItemsWithCollectionSchema),
		clearOnSubmit: 'none',
		taintedMessage: null,
		multipleSubmits: 'abort',

		onSubmit: async ({ formData }) => {
			// Images are now part of the formData and need to be compressed before sending
			const items = formData.getAll('items') as unknown as FileList;
			formData.delete('items');
			imageCompressionTotal = items.length;
			isCompressing = true;
			for (const image of items) {
				try {
					const compressed = await imageCompression(image as File, UPLOAD_OPTIONS);
					imageCompressionProgress++;
					formData.append('items', new File([compressed], image.name));
				} catch (e) {
					modalStore.trigger(
						getErrorModal(
							`There was an error compressing the image ${image.name}. It has been skipped.`
						)
					);
				}
			}
			isCompressing = false;
			isSubmitting = true;
		},
		onResult: async ({ result }) => {
			isSubmitting = false;
			if (result.status === 503) {
				modalStore.clear();
				let message = result as ActionResult & { data: { message: string } };
				modalStore.trigger(getErrorModal(message.data.message));
			} else if (result.status === 200) {
				clearCache($page.url.pathname);
				fileList = undefined;
				$form.items = [];
				await invalidate(`collection:${$page.params.id}`);
			}
		}
	});

	function resetImageSelection() {
		$form.items = [];
		fileList = undefined;
	}

	function filesSelected() {
		if (fileList) {
			const tooManyFiles = fileList.length > 20;
			if (tooManyFiles) {
				modalStore.trigger(getErrorModal('You can only upload a maximum of 20 images at a time'));
				resetImageSelection();
			}
		}
	}
</script>

<Card class={classNames(twMerge('h-72 max-h-72  p-0 m-0 flex overflow-hidden  '))}>
	<form
		action={`${PATHS.COLLECTIONS}/${$page.params.id}?/${SERVER_FORM_ACTIONS.ADD_ITEMS_TO_COLLECTION}`}
		use:enhance
		method="POST"
		on:submit|preventDefault
		enctype="multipart/form-data"
		class="flex flex-col w-full h-full"
	>
		<input type="hidden" name="collectionId" value={$page.params.id} />
		<FileDropzone
			allowDuplicates={true}
			name="items"
			bind:files={fileList}
			accept={UPLOAD_FILTERS.allowedFileTypes.join(', ')}
			class="m-0 p-0 border-none flex-1"
			multiple={true}
			on:change={filesSelected}
		>
			<svelte:fragment slot="lead">
				<div class="flex justify-center">
					{#if fileList}
						<IconCheckTrue />
					{:else}
						<IconUpload width={50} height={50} />
					{/if}
				</div>
			</svelte:fragment>
			<svelte:fragment slot="message">
				{#if fileList}
					{#if isCompressing}
						<Typography>Compressing Images</Typography>
						<ProgressBar value={imageCompressionProgress} max={imageCompressionTotal} />
					{:else if isSubmitting}
						<Typography>Submitting</Typography>
						<IconLoading />
					{:else}
						<Typography align="center">
							{fileList.length} images selected
						</Typography>
						<div
							class={twMerge(
								classNames('relative z-50 mt-8 -mx-4 flex flex-col justify-evenly items-stretch ')
							)}
						>
							<button
								class=" btn rounded-none variant-soft-warning flex justify-center items-center w-full h-full"
								on:click={resetImageSelection}
								disabled={!fileList}
							>
								Reset
							</button>
							<button
								class="btn rounded-none variant-soft-primary flex justify-center items-center w-full h-full"
								type="submit"
								disabled={!fileList}
							>
								Upload
							</button>
						</div>
					{/if}
				{:else}
					<Typography>Add Images</Typography>
				{/if}
			</svelte:fragment>
		</FileDropzone>
	</form>
</Card>
