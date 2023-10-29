<script lang="ts">
	import OtherUserDetails from '@components/molecues/user/otherUserDetails.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<OtherUserDetails userData={data.streamed.user} />
