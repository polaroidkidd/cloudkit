<script lang="ts">
	import type { PageData } from './$types';

	import UserDetails from '@components/molecues/user/myUserDetails.svelte';

	export let data: PageData;
	const { editUserForm } = data;
</script>

{#if data.user}
	<UserDetails userData={data.user} {editUserForm} />
{/if}

<hr class="my-12" />
