<script lang="ts">
	import { enhance } from '$app/forms';
	import { IconKebabMenu } from '@cloudkit/ui-core';
	import {
		createCollectionModalConfig,
		editCollectionModalConfig,
		getConfirmationModalConfig,
		getErrorModal,
		moveCollectionModalConfig
	} from '@cloudkit/ui-core';

	import {Typography }from '@cloudkit/ui-core';
	import type { Actions, CollectionWithRelations } from '@cloudkit/ui-core';
	import { FORM_ACTIONS } from '@cloudkit/ui-core';
	import { getModalStore, getToastStore, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { ActionResult } from '@sveltejs/kit';
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';
	import { v4 as uuid } from 'uuid';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	export let collection: CollectionWithRelations;
	let deleteCollectionForm: HTMLFormElement;
	const actions: Actions = [
		{
			title: 'Edit',
			level: 'primary',
			callback: () => {
				modalStore.trigger(editCollectionModalConfig);
			}
		},
		{
			title: 'Print Box Label',
			level: 'primary',
			callback: () => printQrCode({ collectionId: collection.id })
		},
		{
			title: 'Move',
			level: 'primary',
			callback: () => {
				modalStore.trigger(moveCollectionModalConfig);
			}
		},
		{
			title: 'Insert',
			level: 'primary',
			callback: () => modalStore.trigger(createCollectionModalConfig(collection.id))
		},
		{
			title: 'Delete Tags',
			level: 'warning',
			callback: () => deleteAllTagsFromCollection(collection.id)
		},
		{
			title: 'Delete Collection',
			level: 'error',
			callback: () => deleteCollection()
		}
	];

	const targetId = `target-${uuid()}`;
	const popupClick: PopupSettings = {
		event: 'click',
		target: targetId,
		placement: 'bottom'
	};

	function printQrCode({ collectionId }: { collectionId: string }) {
		throw new Error('Function not implemented.' + collectionId);
	}

	async function deleteAllTagsFromCollection(collectionId: string) {
		const formData = new FormData();
		formData.append('collectionId', collectionId);
		const result = await fetch(FORM_ACTIONS.DELETE_ALL_TAGS_FROM_COLLECTION, {
			method: 'DELETE',
			body: formData
		});

		if (result.ok) {
			throw new Error('Store Update not yet implemented');
		}
	}

	function deleteCollection() {
		modalStore.trigger(
			getConfirmationModalConfig({
				title: 'Confirm',
				body: 'Are you sure you want to delete this collection? This cannot be undone.',
				callback: async (r: unknown) => {
					if (r) {
						deleteCollectionForm.requestSubmit();
					}
				}
			})
		);
	}

	function handleResult(result: ActionResult) {
		let message = result as ActionResult & {
			data?: { form?: { errors?: { collectionId?: string } } };
		};

		if (message.data?.form?.errors?.collectionId) {
			// TODO: Figure out why I have to warp this in a setTimeout
			setTimeout(() => {
				modalStore.trigger(getErrorModal(message.data?.form?.errors?.collectionId ?? 'error'));
			}, 150);
		} else if (message.type === 'success') {
			toastStore.trigger({
				message: 'Collection deleted successfully.',
				timeout: 5000,
				classes: 'rounded-full overflow-clip',
				background: 'variant-filled-success'
			});
		}
	}
</script>

<div class={twMerge(classNames('flex flex-row gap-2 justify-center items-center'))}>
	<Typography variant="span" size="base">
		{collection.name}
	</Typography>
	<button use:popup={popupClick} type="button" class="ml-auto">
		<IconKebabMenu width={20} height={20} />
	</button>
	<div data-popup={targetId}>
		<div class="relative z-50 btn-group-vertical rounded-lg backdrop-blur-3xl">
			{#each actions as action}
				<button
					on:click={action.callback}
					disabled={action.disabled}
					class={classNames({
						'variant-soft-primary': action.level === 'primary',
						'variant-soft-success': action.level === 'success',
						'variant-soft-warning': action.level === 'warning',
						'variant-soft-error': action.level === 'error'
					})}
				>
					{action.title}
				</button>
			{/each}
		</div>
	</div>
	<form
		action={FORM_ACTIONS.DELETE_COLLECTION}
		use:enhance={() => {
			return async ({ result }) => {
				handleResult(result);
			};
		}}
		on:submit|preventDefault
		method="POST"
		class="hidden"
		bind:this={deleteCollectionForm}
	>
		<input type="hidden" name="collectionId" value={collection.id} />
	</form>
</div>
