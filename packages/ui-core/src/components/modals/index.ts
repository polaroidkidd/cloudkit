import type { ModalSettings, ModalStore } from '@skeletonlabs/skeleton';

export enum MODAL_PUBLIC {
	REGISTER = 'signUp',
	LOG_IN = 'logIn',
	CREATE_ERROR = 'createError'
}


export const authenticateModalConfig: ModalSettings = {
	type: 'component',
	component: MODAL_PUBLIC.LOG_IN
};

export const registerModalConfig: ModalSettings = {
	type: 'component',
	component: MODAL_PUBLIC.REGISTER
};

export function getErrorModal(errorMessage: string): ModalSettings {
	return {
		type: 'alert',
		title: 'Error',
		body: errorMessage,
		buttonTextCancel: 'OK'
	};
}

type GetModalConfigArgs = {
	title: string;
	body: string;
	callback: (r: boolean | undefined) => void;
};

export function getConfirmationModalConfig({
	title,
	body,
	callback
}: GetModalConfigArgs): ModalSettings {
	return {
		type: 'confirm',
		title: title,
		body: body,
		response: callback
	};
}


export function openConfirmationModal({
	title,
	body,
	modalStore,
	callback
}: GetModalConfigArgs & { modalStore: ModalStore }): void {
	modalStore.trigger(
		getConfirmationModalConfig({
			title,
			body,
			callback
		})
	);
}
