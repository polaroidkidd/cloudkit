<script lang="ts">
	import AuthFlow from './sections/auth-flow.svelte';
	import GithubActions from './sections/github-actions.svelte';
	import Pr from './sections/pr.svelte';
	import Prerequisites from './sections/prerequisites.svelte';
	import RoadMap from './sections/road-map.svelte';
	import RunLocal from './sections/run-local.svelte';
	import RunProd from './sections/run-prod.svelte';
	import Tech from './sections/tech.svelte';
	import Welcome from './sections/welcome.svelte';
</script>

<Welcome />
<Tech />
<AuthFlow />
<Prerequisites />
<RunLocal />
<RunProd />
<GithubActions />
<Pr />
<RoadMap />
