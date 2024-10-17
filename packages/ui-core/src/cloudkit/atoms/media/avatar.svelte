<script lang="ts">
	import { PUBLIC_IMAGE_DELIVERY } from '$env/static/public';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let width = '';
	export let src: string | null | undefined;
	export let isLarge: boolean = false;
	export let initials = '';
	export let border = '';
	export let isBase64 = false;
	let url = isBase64
		? (src as string)
		: `${PUBLIC_IMAGE_DELIVERY}/${src}/${isLarge ? 'public' : 'small'}`;
</script>

{#if src !== null}
	<Avatar {initials} {width} src={url} class="mb-2" {border} />
{/if}
