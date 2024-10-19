<section class="mb-20">
	<h3 class="h3 mb-5">Understanding the PR.yaml Github Action</h3>
	<div class="text-xl mb-5">
		The Github PR.yaml action triggers on every opened PR and on fresh pushes to that PR and runs
		the following jobs:
	</div>
	<div class="flex-grow flex-col flex flex-wrap justify-center gap-10 ml-5">
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">1.</span>
			<div class="flex flex-col gap-3">
				<code>INSTALL</code>
				<div>
					Installs depdendencies from <code>pnpm-lock.yaml</code>
					and caches them
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>LINT</code>
				<div>Runs prettier and the sveltekit-check command</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">3.</span>
			<div class="flex flex-col gap-3">
				<code>UNIT_TEST</code>
				<div>
					Runs unit tests using <code>vitest</code>
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">4.</span>
			<div class="flex flex-col gap-3">
				<code>PUBLISH</code>
				<div>
					There are three publish jobs. One for the web-app, one for the swagger-ui and one for the
					storybook.
				</div>
			</div>
		</div>
	</div>
</section>
