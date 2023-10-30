<section class="mb-20">
	<h3 class="h3 mb-5">Data Proxy</h3>
	<p class="text-xl pb-4">
		As previously mentioned, prisma doesn't a direct connection to Databases form edge functions.
		You need to create a <a
			href="https://www.prisma.io/docs/data-platform/classic-projects/data-proxy"
			class="anchor">Data Proxy</a
		>, which does some prisma magic and then you can use Prisma in Edge Functions. This is why there
		are two prisma schemas. The "normal" way of defining your data source is this
	</p>

	<pre class="text-xl">
		datasource db {'{'}
			provider = "postgresql"
			url = env("DATABASE_URL")
		{'}'}
	</pre>
	<p class="text-xl pb-4">If you're using the Data Proxy, you have to declare it like this</p>
	<pre class="text-xl">
		datasource db {'{'}
			provider = "postgresql"
			url = env("DATA_PROXY")
			directUrl = env("DATABASE_URL")
		{'}'}
	</pre>
	<p class="text-xl">
		The <code>DATABASE_URL</code> refers to the standard Database URL and <code>DATA_PROXY</code>
		refers to the connection string you generate when creating a
		<a class="anchor" href="https://cloud.prisma.io/">Cloud Prisma Project </a>
		- Its free for mostly everything.
	</p>
</section>
