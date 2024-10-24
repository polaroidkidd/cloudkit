<script>
	import { qr } from '@svelte-put/qr/svg';
	export let url = '';
</script>

<svg
	use:qr={{
		data: url,
		shape: 'square',
		typeNumber: 10,
		logoRatio: 1,
		errorCorrectionLevel: 'L',
		margin: 1,

		moduleFill: ''
	}}
/>
