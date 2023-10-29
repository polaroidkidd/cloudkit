<script lang="ts">
	export let titel: string;
	export let description: string;
	export let badge = '💀';
</script>

<dev class="list max-w-md w-full mt-0">
	<div>
		<span class="badge bg-primary-500">{badge}</span>
		<span class="flex-auto">
			<dt class="text-2xl my-3">{titel}</dt>
			<dd class="text-xl">{description}</dd>
		</span>
	</div>
</dev>
