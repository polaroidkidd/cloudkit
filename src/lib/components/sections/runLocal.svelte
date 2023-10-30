<section class="mb-20">
	<h3 class="h3 mb-5">Running this locally</h3>

	<ol class="list ml-5">
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">1.</span><span
				>Create a <code>.env.development</code> file (you can just copy the
				<code>.env.example</code> file)</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">2.</span><span
				>Start up the docker containers (<code>docker-compose up -d</code>)</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">3.</span><span
				>Run <code>pnpm prep</code>. This will generate the prisma schema, push it to the DB and
				seed the PSQL & Thumbor containers</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">3.</span><span
				>Run the correct prisma generate command</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">4.</span><span
				>Push the schma to the local psql db</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">6.</span><span
				>Run the <code>pnpm psql:seed</code> command which will generate a admin user and 10 random users.</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">7.</span><span
				>Start the dev server (<code>pnpm dev</code>)</span
			>
		</li>
	</ol>
</section>
