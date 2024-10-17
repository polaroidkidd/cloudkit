<script lang="ts">
	import AboutThisProject from './sections/about-this-project.svelte';
	import AuthFlow from './sections/auth-flow.svelte';
	import DataProxy from './sections/data-proxy.svelte';
	import GithubActions from './sections/github-actions.svelte';
	import Pr from './sections/pr.svelte';
	import Prerequisites from './sections/prerequisites.svelte';
	import PrismaCodeOrg from './sections/prisma-code-org.svelte';
	import RunLocal from './sections/run-local.svelte';
	import RunProd from './sections/run-prod.svelte';
	import Scripts from './sections/scripts.svelte';
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
<Scripts />
<DataProxy />
<PrismaCodeOrg />
<Pr />
<AboutThisProject />
