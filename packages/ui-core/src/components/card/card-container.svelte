<script lang="ts">
	import classNames from 'classnames';
	import { twMerge } from 'tailwind-merge';
	export let subgrid = false;
	export let containerName = 'card';
</script>

<div
	class={twMerge(
		classNames(`@container/${containerName}`, 'w-full h-full gap-4 mb-10', {
			'grid grid-cols-3 auto-rows-fr': !subgrid,
			'grid grid-cols-subgrid col-span-4 auto-rows-fr': subgrid
		})
	)}
>
	<slot />
</div>
