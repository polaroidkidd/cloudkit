<script lang="ts">
	export let href = '';
	export let email = false;
	export let target: '_blank' | '_self' | '_parent' | '_top' = '_self';
</script>

<a href={email ? `mailto:${href}` : href} {target} class="anchor"><slot /></a>
