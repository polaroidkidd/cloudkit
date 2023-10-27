export type IVariant = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
export type IWeight = 'thin' | 'light' | 'medium' | 'bold' | 'extrabold';
export type IAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
export type IFamily = 'serif' | 'sans' | 'mono';
export type ISize = 'sm' | 'base' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
export type ISpacing = 0 | 1 | 2 | 3 | 4 | 5;

function getFontWeight(weight: IWeight) {
	switch (weight) {
		case 'thin': {
			return 'font-thin';
		}
		case 'extrabold': {
			return 'font-extrabold';
		}
		case 'light': {
			return 'font-light';
		}
		case 'bold': {
			return 'font-bold';
		}
		default: {
			return 'font-medium';
		}
	}
}

function getTextAlign(align: IAlign) {
	switch (align) {
		case 'center': {
			return 'text-center';
		}
		case 'right': {
			return 'text-right';
		}
		case 'justify': {
			return 'text-justify';
		}
		case 'start': {
			return 'text-start';
		}
		case 'end': {
			return 'text-end';
		}
		default: {
			return 'text-left';
		}
	}
}

function getFontType(type: IFamily) {
	switch (type) {
		case 'mono': {
			return 'font-mono';
		}
		case 'serif': {
			return 'font-serif';
		}
		default: {
			return 'font-sans';
		}
	}
}

function getTextSize(size: ISize) {
	switch (size) {
		case 'sm': {
			return 'text-sm';
		}
		case 'lg': {
			return 'text-lg';
		}
		case '2xl': {
			return 'text-2xl';
		}
		case '3xl': {
			return 'text-3xl';
		}
		case '4xl': {
			return 'text-4xl';
		}
		case '5xl': {
			return 'text-5xl';
		}
		case '6xl': {
			return 'text-6xl';
		}
		case '7xl': {
			return 'text-7xl';
		}
		default: {
			return 'text-base';
		}
	}
}

function getSpacing(space: ISpacing, type: 'm' | 'p') {
	switch (space) {
		case 1: {
			return type === 'p' ? 'p-1' : 'm-1';
		}
		case 2: {
			return type === 'p' ? 'p-2' : 'm-2';
		}
		case 3: {
			return type === 'p' ? 'p-3' : 'm-3';
		}
		case 4: {
			return type === 'p' ? 'p-4' : 'm-4';
		}
		case 5: {
			return type === 'p' ? 'p-5' : 'm-5';
		}
		default: {
			return type === 'p' ? 'p-0' : 'm-0';
		}
	}
}

export const fontUtils = {
	getFontWeight,
	getTextAlign,
	getFontType,
	getTextSize,
	getSpacing
};
