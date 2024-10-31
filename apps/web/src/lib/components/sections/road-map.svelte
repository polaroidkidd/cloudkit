<section class="mb-20">
	<h3 class="h3 mb-5">Roadmap</h3>
	<div class="text-xl mb-5">
		There are a few to-do items here, but nothing that wills top you from using this as a starting
		point. Feel free to open issues/PRs if you have ideas and want to address issues.
	</div>
	<div class="flex-grow flex-col flex flex-wrap justify-center gap-10 ml-5">
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">1.</span>
			<div class="flex flex-col gap-3">
				<code>Remove Lucia Auth</code>
				<div>
					Unforunately Lucia Auth has been depcricated and will no longer receiver updates beyond
					V3. Therefore I'm going to migrate this template away from lucia. I don't know to what
					yet, so I'm open for suggestions.
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>Redis Sessions</code>
				<div>
					Lucia V3 dropped support for redis session management. I'd like to get this back as I feel
					that keeping sessions in redis and not hitting the DB for every request is good the
					performance and would keep DB costs lower.
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">3.</span>
			<div class="flex flex-col gap-3">
				<code>API Rate Limiting</code>
				<div>
					I'd like to add basic rate limiting functions to the API endpoints using <a
						class="anchor"
						href="https://superforms.rocks/rate-limiting"
						target="_blank"
					>
						sveltekit-rate-limiter
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
