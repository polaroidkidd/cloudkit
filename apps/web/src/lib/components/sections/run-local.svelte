<section class="mb-20">
	<h3 class="h3 mb-5">Running this locally</h3>
	<div class="flex-grow flex-col flex flex-wrap justify-center gap-10 ml-5">
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">1.</span>
			<div class="flex flex-col gap-3">
				<div>
					Create a <code>.env.development</code>
				</div>

				<p>
					It's used to configure access to the local thumbor instance (for storing and retrieving
					images) and the local database
				</p>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<div>
					Run <code>pnpm dev</code>
				</div>

				<div>
					<p>
						The <code>turbo.json</code>
						configuration is set up with all the appropriate dependencies and will take care of the following.
					</p>
					<ol class="my-4 flex flex-col gap-3">
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">1.</span>
							<span>
								Pull and start two docker containers (thumbor for image storage and postgresql for
								user/data storage)
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">2.</span>
							<span>
								Generate the prisma client based on the schema from the <code>db-schema</code>
								module
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">3.</span>
							<span>
								Push the gererated prisma client to the local psql container. <i>
									Note: This might fail if the containers are not up and running yet. If it does,
									just run <code>pnpm dev</code>
									a couple of times until it takes.
								</i>
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">4.</span>
							<span>
								Generate zod schemas, which are consumed in the <code>service-contract</code>
								module.
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">5.</span>
							<span>
								Launch the swagger-ui sveltekit app. This allows you to test out your API endpoints
								locally.
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">6.</span>
							<span>
								Launch storybook so you can keep an eye on all your current components and their
								states.
							</span>
						</li>
						<li class="flex flex-row gap-3">
							<span class="badge-icon p-4 variant-soft-warning">7.</span>
							<span>Launch the web-app.</span>
						</li>
					</ol>
				</div>
			</div>
		</div>
	</div>
</section>
