<script lang="ts">
	import AboutThisProject from './sections/aboutThisProject.svelte';
	import AuthFlow from './sections/authFlow.svelte';
	import DataProxy from './sections/dataProxy.svelte';
	import GithubActions from './sections/githubActions.svelte';
	import Pr from './sections/pr.svelte';
	import Prerequisites from './sections/prerequisites.svelte';
	import PrismaCodeOrg from './sections/prismaCodeOrg.svelte';
	import RunLocal from './sections/runLocal.svelte';
	import RunProd from './sections/runProd.svelte';
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
