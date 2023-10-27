<script lang="ts">
	import type { PageData } from './$types';

	import { goto } from '$app/navigation';
	import SimpleButton from '@components/atoms/buttons/simpleButton.svelte';
	import UserDetails from '@components/molecues/user/myUserDetails.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { getErrorModal } from '@components/organisms/modals/modalUtils';

	const modalStore = getModalStore();
	export let data: PageData;
	const { editUserForm } = data;
</script>

{#if data.user}
	<UserDetails userData={data.user} {editUserForm} />
{/if}

<hr class="my-12" />
