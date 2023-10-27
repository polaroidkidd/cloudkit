<script lang="ts">
	import { PUBLIC_THUMBOR_URL } from '$env/static/public';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let width = '';
	export let src: string | null | undefined;
	export let isLarge: boolean = false;
	export let initials = '';
	export let border = '';
	export let isBase64 = false;
	$: url = isBase64
		? (src as string)
		: `${PUBLIC_THUMBOR_URL}/unsafe/${isLarge ? '500x500' : '64x64'}/${encodeURI(`${src}`)}`;
</script>

{#if src !== null}
	<Avatar {initials} {width} src={url} class="mb-2" {border} />
{/if}
