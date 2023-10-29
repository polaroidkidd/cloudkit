<script lang="ts">
	import IconLoading from '@components/atoms/icons/IconLoading.svelte';
	import ListItem from '@components/atoms/lists/listItem.svelte';
	import UserCardList from '@components/molecues/user/userCardList.svelte';

	export let data;
</script>

<header>
	<div class="mx-auto mb-20 flex flex-col gap-5">
		<h1 class="h1 text-center">
			Welcome to <a class="anchor" href="https://github.com/polaroidkidd/cloudkit">CloudKit</a>
		</h1>
		<h2 class="h2 text-center">A production ready sveltekit cloudflare template</h2>
		<h3 class="h3 text-center">
			Author: <a class="anchor" href="https://dle.dev">Daniel Einars</a>
		</h3>
	</div>
</header>
<section class="mb-20">
	<p class="text-2xl mb-10 font-bold text-center">
		This is a complete Sveltekit Template designed to help you release you SvelteKit App on
		Cloudflare Pages using the following services:
	</p>
	<div class="flex-grow flex flex-wrap justify-center gap-10 text-center">
		<ListItem
			titel="Sensible Defaults for Dev Tooling"
			description="TypeScript, ESLint, Prettier & Husky for pre-commit hooks"
		/>
		<ListItem
			titel="Cloudflare Pages"
			description="Automatic publication for preview branches and production deployment on push-to-master"
		/>
		<ListItem
			titel="Authentication"
			description="Lucia Auth with a production-ready Sign Up/In/Out flow and Delete Account flow."
		/>
		<ListItem
			titel="Prisma"
			description="Integration with Postgres & Redis, locally and in production. Clean and simple data access layer with specific Repository Classes."
		/>
		<ListItem
			titel="Github Actions"
			description="Runs Linting, Type-Verification, Unit & E2E Tests automatically."
		/>
		<ListItem
			titel="E2E Tests"
			description="Playwright for E2E Tests in Github Actions and for local development"
		/>
		<ListItem
			titel="Unit Tests"
			description="Preconfigured ViteTest for Unit Tests in Github Actions and for local development"
		/>
		<ListItem
			titel="Redis"
			description="Preconfigured to use a local redis docker container for dev and e2e tests and a Upstash Cluster for production"
		/>

		<ListItem
			titel="Postgres"
			description="Preconfigured to use a local psql docker container for dev and e2e tests and a Neon.Tech Database for production"
		/>
		<ListItem
			titel="Image hosting & processing"
			description="Preconfigured to use Cloudflare Image Service for production and a Thumbor docker container for dev and e2e tests"
		/>
	</div>
</section>

<section class="mb-20">
	<h3 class="h3 text-center mb-5">Auth Flow</h3>
	<div class="text-xl text-center">
		You can try out the Auth Flow right here. Either create a new user by signing up or use one of
		the existing users. The default Username and Password is admin@dle.dev. Feel free to try it out!
		This website will be redeployed every 24h.
	</div>
</section>
<section class="mb-20">
	<h3 class="h3 text-center mb-5">Prerequisites</h3>
	<div class="text-xl text-center">
		Becase <code>PR.yaml</code> action uses docker containers, you'll have to configure the following
		Github Action Secrets in a `CI` environment in order for the Workflow to run through without errors.
		Example Values of these can be cound in the `.env.ci` file.
	</div>
</section>
<section class="mb-20">
	<h3 class="h3 mb-5">Running this locally</h3>

	<ol class="list ml-5">
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">1.</span><span
				>Create a `.env.development` file (you can just copy the `.env.example` file)</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">2.</span><span
				>Start up the docker containers (`docker-compose up -d`)</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">3.</span><span
				>Run `pnpm prep`. This will</span
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
				>Run the `pnpm psql:seed` command which will generate a admin user and 10 random users.</span
			>
		</li>
		<li class="text-xl pb-2">
			<span class="badge-icon p-4 variant-soft-primary">7.</span><span
				>Start the dev server (`pnpm dev`)</span
			>
		</li>
	</ol>
</section>
<section class="mb-20">
	<h3 class="h3 mb-5">Running this in Production</h3>
	<div class="text-xl mb-5">
		You'll need to configure some services and environment variables in the Github Actions to run
		this in Prod.
	</div>
	<div class="flex-grow flex-col flex flex-wrap justify-center gap-10 ml-5">
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">1.</span>
			<div class="flex flex-col gap-3">
				<a href="https://pages.cloudflare.com/" class="anchor">Cloudflare Pages</a>
				<div>There is a free tier but even the paid tier isn't very expensive.</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<a class="anchor" href="https://www.cloudflare.com/developer-platform/cloudflare-images/">
					Cloudflare Images
				</a>

				<div>
					This one is paid only. It's 5 USD / Month / 100'000 Image served with 20 configured
					variations (the variations do not count to the 100'000 image limit). Delivering images is
					1 USD for every 100'000 images. There's also a enterprise version. Check out the details <a
						class="anchor"
						href="https://developers.cloudflare.com/images/pricing/">here</a
					>.
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">3.</span>
			<div class="flex flex-col gap-3">
				<a href="https://neon.tech/" class="anchor">Neon.Tech</a>
				<div>
					Database - I've been using their free tier for ages without hitting any limits so far. The
					only reason I went ahead and upgraded was because you can only have one project on the
					free tier. They don't charge you for a month if the bill is under 50 Cent. It's very
					affordable for what you're getting. Seriously, <a
						class="anchor"
						href="https://neon.tech/pricing">check them out</a
					>.
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">4.</span>
			<div class="flex flex-col gap-3">
				<a class="anchor" href="https://upstash.com/">Upstash</a>
				<div>
					They have a generous free tier. Personally, I use the "Pay As You Go" option and set a low
					budget limit. Check out their pricing <a
						class="anchor"
						href="htttps://upstash.com/pricing">here</a
					>.
				</div>
			</div>
		</div>
		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">5.</span>
			<div class="flex flex-col gap-3">
				<a class="anchor" href="https://cloud.prisma.io/">Prisma Cloud</a>
				<div>
					You will not be able to hack your way around this one because prisma's edge client doesn't
					allow connecting to a database directly. They have a generous free tier and that's the
					only thing I use them for. Create a project [here](https://cloud.prisma.io/), create the
					Connection String and use this. Their DataExplorer will then be linked to the production
					database, which can be quite handy as well.
				</div>
			</div>
		</div>
	</div>
</section>
<section class="mb-20">
	<h3 class="h3 mb-5">Github Actions Environemnts</h3>
	<p class="text-xl mb-4">
		I've configured the actions using a <code>CI</code> and a <code>PREVIEW</code> environment. The
		Variables keys for both are the same (see <code>.env.example</code>). The <code>CI</code>
		environment values should use the same values as in the <code>.env.example</code> file, as these
		are used to run the e2e tests against the docker containers. The <code>PREVIEW</code> values need
		to be set values from the relevant services.
	</p>
	<p class="text-xl mb-4">
		In addition to these you'll have to configure <code>CLOUDFLARE_API_TOKEN</code> and
		<code>CLOUDFLARE_ACCOUNT_ID</code>
		to enable preview & production publishing. You can optain the <code>CLOUDFLARE_API_TOKEN</code> in
		the cloudflare dashboard. Create a new token which allows editing for Cloudflare Pages. Then set
		up a Pages Project. The Github Action should then deply accordingly. You can also assign it to a
		domain if you use cloudlfare to manage your domains (I highly reccomend this, it makes life so much
		easier).
	</p>
</section>
<section class="mb-20">
	<h3 class="h3 mb-5">Scripts in <code>package.json</code></h3>
	<div class="text-xl mb-4">
		I've included a lot of scripts in the `package.json` file. The mostly depend on each other. The
		naming follows this pattern in general

		<div class="my-4"><code>`[WHAT]:[ACTION]:[ENV]`</code></div>
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
					Dumps the content of the current database into a <code>sk-db-dump.sql</code> file. You can
					<code>./sk-db-dump.sql:/docker-entrypoint-initdb.d/init.sql</code> which will initialize the
					psql container with those contents on start up every time.
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">2.</span>
			<div class="flex flex-col gap-3">
				<code>pnpm psql:restore</code>
				<div>
					Restores from the latest <code>sk-db-dump.sql</code> file, if it exists.
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
<section class="mb-20">
	<h3 class="h3 mb-5">Data Proxy</h3>
	<p class="text-xl pb-4">
		As previously mentioned, prisma doesn't a direct connection to Databases form edge functions.
		You need to create a [Data
		Proxy](https://www.prisma.io/docs/data-platform/classic-projects/data-proxy), which does some
		prisma magic and then you can use Prisma in Edge Functions. This is why there are two prisma
		schemas. The "normal" way of defining your data source is this
	</p>

	<pre>
		datasource db {'{'}
			provider = "postgresql"
			url = env("DATABASE_URL")
		{'}'}
	</pre>
	<p class="text-xl pb-4">If you're using the Data Proxy, you have to declare it like this</p>
	<pre>
		datasource db {'{'}
			provider = "postgresql"
			url = env("DATA_PROXY")
			directUrl = env("DATABASE_URL")
		{'}'}
	</pre>

	The<code>DATABASE_URL</code> refers to the standard Database URL and <code>DATA_PROXY</code>
	refers to the connection string you generate when creating a
	<a class="anchor" href="https://cloud.prisma.io/">Cloud Prisma Project </a>
	- Its free for mostly everything.
</section>

<section class="mb-20">
	<h3 class="h3 mb-5">Prisma Code Organization</h3>
	<p class="text-xl mb-5">
		I couldn't find a good way to keep all my prisma relevant code together so I came up with the
		following solution. There are two `Repository` classes. One for managing Users and one for
		managing Images. I've split the Prisma code up like this in order to keep the primsa imports to
		a bare minimum. All DB Actions I do via these classes and they are called only from the server.
	</p>
	<p>
		<strong>Note:</strong> The <code>ImageRepository</code> can interchangebly be used with the local
		thumbor container or with Cloudflare's Image Service.
	</p>
</section>

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
					Installs depdendencies from <code>pnpm-lock.yaml</code> and caches them
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
				<div>Runs unit tests using `vitest`</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">4.</span>
			<div class="flex flex-col gap-3">
				<code>E2E_TEST</code>
				<div>Launches docker containers, seeds the database and thumbor and runs all e2e tests</div>
			</div>
		</div>
	</div>
</section>

<section class="mb-20">
	<h3 class="h3 mb-5">Notes about this Project</h3>
	<div class="text-xl mb-5">
		This project is a work in progress. I'm using it to build a few projects and will update it
		accordingly. If you have any questions, feel free to reach out by creating an issue or
		discussion on GitHUb.
	</div>
</section>
{#await data.streamed.users}
	<IconLoading />
{:then users}
	<UserCardList {users} />
{/await}
