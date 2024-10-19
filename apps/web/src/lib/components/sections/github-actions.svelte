<section class="mb-20">
	<h3 class="h3 mb-5">Github Actions Environemnts</h3>
	<p class="text-xl mb-4">
		There are two workflow files. <code>PR.yml</code>
		and
		<code>MERGE_MASTER.yml</code>
		. The
		<code>PR.yml</code>
		is used for all pull requests and the
		<code>MERGE_MASTER.yml</code>
		is used for merging to the master branch.
	</p>
	<p class="text-xl mb-4">
		Both workflows are set up to deploy all three apps to their respective cloudflare projects,
		including feature branch deployments.
	</p>
</section>
