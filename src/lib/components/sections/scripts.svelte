<section class="mb-20">
	<h3 class="h3 mb-5">Scripts in <code>package.json</code></h3>
	<div class="text-xl mb-4">
		I've included a lot of scripts in the <code>package.json</code> file. The mostly depend on each
		other. The naming follows this pattern in general

		<div class="my-4"><code>[COMMAND]:[ACTION]:[ENV]</code></div>
		For example, If I want to generate my prisma schema for local development I would run
		<code>pnpm prisma:gen:dev</code>.

		<div class="my-4">Here are some useful scripts</div>
	</div>
	<div class="flex-grow flex-col flex flex-wrap justify-center gap-10 ml-5">
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">1.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm psql:dump</code>
				<div>
					Dumps the content of the current database into a <code>cloudkit-db-dump.sql</code> file.
					You can
					<code>./cloudkit-db-dump.sql:/docker-entrypoint-initdb.d/init.sql</code> which will initialize
					the psql container with those contents on start up every time.
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm psql:restore</code>
				<div>
					Restores from the latest <code>cloudkit-db-dump.sql</code> file, if it exists.
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm test:e2e:dev</code>
				<div>
					Runs the sveltekit development server and Playwright in UI mode. This way you can code and
					verify your tests at the same time.
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm clean</code>
				<div>
					Deletes the <code>./playwright-report</code>, <code>./.wrangler</code> and
					<code>./.svelte-kit</code> folders for a clean slate
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm prep</code>
				<div>
					If your docker containers are running, this will generate the prisma schema, push it to
					the psql container and seed the database
				</div>
			</div>
		</div>
	</div>
</section>
