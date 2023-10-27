<script lang="ts">
	import classNames from 'classnames';
	import {
		fontUtils,
		type IAlign,
		type IFamily,
		type ISize,
		type ISpacing,
		type IVariant,
		type IWeight
	} from './typography.utils';

	export let variant: IVariant = 'span';
	export let weight: IWeight = 'medium';
	export let align: IAlign = 'left';
	export let family: IFamily = 'sans';
	export let padding: ISpacing = 0;
	export let margin: ISpacing = 0;
	export let size: ISize = 'base';
	let clazz = '';
	export { clazz as class };
	let fontWeight = fontUtils.getFontWeight(weight);
	let textAlign = fontUtils.getTextAlign(align);
	let fontType = fontUtils.getFontType(family);
	let textSize = fontUtils.getTextSize(size);
	let _padding = fontUtils.getSpacing(padding, 'p');
	let _margin = fontUtils.getSpacing(margin, 'm');
</script>

<svelte:element
	this={variant}
	class={classNames(fontWeight, textAlign, fontType, textSize, _padding, _margin, clazz)}
>
	<slot />
</svelte:element>
