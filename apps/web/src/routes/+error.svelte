<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>Whoopsie. Looks like something went wrong</h1>
<h1>{$page.error?.message}</h1>
