<script lang="ts">
	import classNames from 'classnames';
	export let target = '';
	export let text = '';
</script>

<a
	href={target}
	class={classNames(
		'mx-2 rounded-lg',
		'text-xl',
		'h-14',
		'py-2',
		'justify-center uppercase',
		'cursor-pointer',
		'transition-all',
		'h-100',
		'flex',
		'flex-row',
		'items-center',
		'px-5',
		'border-transparent',
		'hover:border-slate-600 border',
		'hover:bg-slate-400',
		'hover:bg-opacity-20',
		'dark:hover:bg-opacity-40',
		'dark:hover:bg-neutral-800'
	)}
>
	{text}
</a>
