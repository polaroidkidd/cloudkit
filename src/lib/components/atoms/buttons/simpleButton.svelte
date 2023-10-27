<script lang="ts">
	import classNames from 'classnames';
	export let disabled = false;
	export let formAction: string | null = null;
	export let ariaLabel: string | null = null;
	export let type: 'reset' | 'submit' | null | undefined = null;
	let clazz = '';
	export { clazz as class };
</script>

<button
	{type}
	aria-label={ariaLabel}
	formaction={formAction}
	on:click
	class={classNames('btn variant-filled', clazz)}
	{disabled}
>
	<slot />
</button>
