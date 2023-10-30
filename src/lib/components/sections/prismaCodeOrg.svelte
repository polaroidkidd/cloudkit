<section class="mb-20">
	<h3 class="h3 mb-5">Prisma Code Organization</h3>
	<p class="text-xl mb-5">
		I couldn't find a good way to keep all my prisma relevant code together so I came up with the
		following solution. There are two <code>Repository</code> classes. One for managing Users and one
		for managing Images. I've split the Prisma code up like this in order to keep the primsa imports
		to a bare minimum. All DB Actions I do via these classes and they are called only from the server.
	</p>
	<p>
		<strong>Note:</strong> The <code>ImageRepository</code> can interchangebly be used with the local
		thumbor container or with Cloudflare's Image Service.
	</p>
</section>
