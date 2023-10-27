<script lang="ts">
	import Avatar from '@components/atoms/media/avatar.svelte';
	import type { IUserRepository, UserRepositoryMethods } from '@lib/utils/RepositoryMethods';

	export let users: IUserRepository[UserRepositoryMethods.FindAll];
</script>

<div class="mb-12 flex flex-col gap-10">
	<div data-testid="user-container">
		{#each users as { id, avatar, firstName }}
			<a href={`/users/${id}`} class="">
				<div class="inline-flex flex-col w-24 justify-center items-center mb-4">
					<Avatar src={avatar.url ?? undefined} width="w-20" />
					<div class="anchor">{firstName}</div>
				</div>
			</a>
		{/each}
	</div>
</div>
