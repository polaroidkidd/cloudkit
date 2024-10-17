<script lang="ts">
	import spec from '@cloudkit/service-contract';
	import { onMount } from 'svelte';
	import SwaggerUI from 'swagger-ui';
	import 'swagger-ui/dist/swagger-ui.css';

	onMount(async () => {
		SwaggerUI({
			spec: spec,
			dom_id: '#swagger-ui-container'
		});
	});
</script>

<svelte:head>
	<title>cloudkit API</title>
</svelte:head>

<div id="swagger-ui-container" />
