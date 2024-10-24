<script lang="ts">
	import { type UserWithRelations, Avatar } from '@cloudkit/ui-core';

	export let users: UserWithRelations[];
</script>

<h3 class="h3 text-center mb-8">List of Example Users</h3>
<div
	class="mb-12 max-w-md flex flex-row flex-wrap justify-center gap-4 mx-auto"
	data-testid="user-container"
>
	{#each users as { id, avatar, firstName }}
		{#if avatar && avatar.updatedAt}
			<a href={`/${id}`} class="">
				<div class="inline-flex flex-col w-24 justify-center items-center mb-4">
					<Avatar
						src={avatar.url ?? undefined}
						width="w-20"
						isLarge={false}
						updatedAt={avatar.updatedAt}
					/>
					<div class="anchor">{firstName}</div>
				</div>
			</a>
		{/if}
	{/each}
</div>
