import type { ModalSettings } from '@skeletonlabs/skeleton';

export function getErrorModal(errorMessage: string): ModalSettings {
	return {
		type: 'alert',
		title: 'Error',
		body: errorMessage,
		buttonTextCancel: 'OK'
	};
}
