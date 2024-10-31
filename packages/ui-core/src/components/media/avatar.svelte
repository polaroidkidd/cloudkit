<script lang="ts">
	import { PUBLIC_IMAGE_API_URL } from '$env/static/public';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let width = '';
	export let src: string;
	export let isLarge: boolean = false;
	export let initials = '';
	export let border = '';
	export let isBase64 = false;
	export let updatedAt: Date;
	$: url = isBase64
		? src
		: `${src}${src.includes(PUBLIC_IMAGE_API_URL) ? (isLarge ? '/lg' : '/sm') : ''}`;
</script>

{#if src !== null}
	<Avatar
		{initials}
		{width}
		src={isBase64 ? url : `${url}?${updatedAt.getTime()}`}
		class="mb-2"
		{border}
	/>
{/if}
