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
				<p>There is a free tier but even the paid tier isn't very expensive.</p>
				<p>
					You'll also have to create the projects in Cloudflare and set them up. The project is set
					up to run three cloudflare projects. The web-app, the swagger-ui and storybook.
				</p>
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
						href="https://developers.cloudflare.com/images/pricing/"
					>
						here
					</a>
					.
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
						href="https://neon.tech/pricing"
					>
						check them out
					</a>
					.
				</div>
			</div>
		</div>

		<div class="text-xl pb-2 flex gap-2">
			<span class="badge-icon p-4 variant-soft-primary mr-5">4.</span>
			<div class="flex flex-col gap-3">
				<a class="anchor" href="https://cloud.prisma.io/">Prisma Cloud</a>
				<div>You'll have to create a project there and connect it to the database.</div>
			</div>
		</div>
	</div>
</section>
