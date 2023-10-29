<script lang="ts">
	import Avatar from '@components/atoms/media/avatar.svelte';
	import type { IUserRepository, UserRepositoryMethods } from '@lib/utils/RepositoryMethods';

	export let users: IUserRepository[UserRepositoryMethods.FindAll];
</script>

<h3 class="h3 text-center mb-8">List of Example Users</h3>
<div
	class="mb-12 max-w-md flex flex-row flex-wrap justify-center gap-4 mx-auto"
	data-testid="user-container"
>
	{#each users as { id, avatar, firstName }}
		<a href={`/${id}`} class="">
			<div class="inline-flex flex-col w-24 justify-center items-center mb-4">
				<Avatar src={avatar.url ?? undefined} width="w-20" isLarge={false} />
				<div class="anchor">{firstName}</div>
			</div>
		</a>
	{/each}
</div>
