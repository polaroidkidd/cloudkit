<script lang="ts">
	import classNames from 'classnames';

	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import type { IUserRepository, UserRepositoryMethods } from '@lib/utils/RepositoryMethods';
	import Avatar from '@components/atoms/media/avatar.svelte';

	export let userData: Promise<IUserRepository[UserRepositoryMethods.FindUserById]>;

	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

{#await userData}
	<div class="flex w-full justify-center h-12">
		<IconLoading />
	</div>
{:then user}
	{#if user}
		<div
			class={classNames(
				// Small Mobile
				'flex flex-col  items-stretch gap justify-center mx-auto',
				// min: 640px
				'sm:w-3/4 ',
				// min-768px
				'md:w-1/2'
			)}
		>
			<div class="relative mb-10 mt-4">
				<Avatar
					isLarge={true}
					width="w-32 sm:w-40 md:w-56 lg:w-96 mx-auto"
					initials={`${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`}
					src={user.avatar.url ?? undefined}
				/>
			</div>

			<div class="py-1 mt-auto">
				<h3 class="h3">
					{user.firstName}
				</h3>
			</div>
			<div class="py-1">
				<h3 class="h3">
					{user.lastName}
				</h3>
			</div>

			<h4 class="h4 py-1 ml-auto mt-auto">
				Member Since {monthNames[new Date(user.createdAt).getMonth()]}
				{new Date(user.createdAt).getFullYear()}
			</h4>
		</div>
	{/if}
{/await}
