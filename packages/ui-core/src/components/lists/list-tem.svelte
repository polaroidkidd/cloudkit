<script lang="ts">
	import classNames from 'classnames';
	export let id;
	export let titel: string;
	export let description: string;
	export let loading: 'lazy' | 'eager' | null | undefined = 'lazy';
	let placedholderImage: HTMLImageElement;

	let image: HTMLImageElement;
	$: if (image?.complete && image?.naturalWidth > 0) {
		placedholderImage.classList.add('hidden');
		image.classList.remove('hidden');
	}
</script>

<div class="relative md:grid md:grid-cols-2">
	<div
		class={classNames(
			'h-full   w-full bg-slate-900  backdrop-blur-sm bg-opacity-50  my-auto px-10 absolute top-1/2 -translate-y-1/2',
			'md:h-auto md:w-1/2 md:backdrop-blur-none md:bg-opacity-0'
		)}
	>
		<div
			class="flex flex-col justify-center flex-grow h-full text-surface-50 md:text-surface-900 dark:md:text-surface-50"
		>
			<slot name="badge">
				<span class="badge text-surface-500">💀</span>
			</slot>
			<div class="text-2xl my-3 mx-auto">{titel}</div>
			<div class="text-xl">{description}</div>
		</div>
	</div>
	<picture class="w-full">
		<source
			type="image/avif"
			srcset={`https://img.cloudkit.dle.dev/homepage/${id}/xl`}
			media="(min-width: 900px)"
		/>
		<source
			type="image/avif"
			srcset={`https://img.cloudkit.dle.dev/homepage/${id}/lg`}
			media="(min-width: 640px)"
		/>
		<source
			type="image/avif"
			srcset={`https://img.cloudkit.dle.dev/homepage/${id}/md`}
			media="(min-width: 320px)"
		/>
		<source type="image/avif" srcset={`https://img.cloudkit.dle.dev/homepage/${id}/sm`} />

		<img
			{loading}
			width="700"
			height="700"
			alt=""
			src={`https://img.cloudkit.dle.dev/homepage/${id}/lg`}
		/>
	</picture>
</div>
