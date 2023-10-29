<script lang="ts">
	import { PUBLIC_CLOUDFLARE_IMAGE_DELIVERY } from '$env/static/public';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let width = '';
	export let src: string | null | undefined;
	export let isLarge: boolean = false;
	export let initials = '';
	export let border = '';
	export let isBase64 = false;
	$: url = isBase64
		? (src as string)
		: `${PUBLIC_CLOUDFLARE_IMAGE_DELIVERY}/${src}/${isLarge ? 'public' : 'public'}`;
</script>

{#if src !== null}
	<Avatar {initials} {width} src={url} class="mb-2" {border} />
{/if}
