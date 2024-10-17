<script lang="ts">
	import UserDetails from '@components/molecues/user/user-details.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	const { editUserForm } = data;
</script>

<UserDetails {editUserForm} />

<hr class="my-12" />
