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
