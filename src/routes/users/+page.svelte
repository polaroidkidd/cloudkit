<script lang="ts">
	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import UserCardList from '@components/molecues/user/userCardList.svelte';

	export let data;
</script>

{#await data.streamed.users}
	<div class="flex flex-grow w-full justify-center py-24">
		<IconLoading />
	</div>
{:then users}
	<UserCardList {users} />
{/await}
