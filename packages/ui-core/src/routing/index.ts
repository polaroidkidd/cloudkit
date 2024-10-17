export enum PATHS {
	ROOT = '/',
	API = '/api',
	PROFILE = '/profile',

}

export enum PATH_GROUPS {
	PUBLIC = '/(public)',
	PROTECTED = '/(protected)'
}
export enum SERVER_FORM_ACTIONS {
	LOGIN = 'login',
	REGISTER = 'register',
	SIGN_OUT = 'signOut',
	UPDATE_USER = 'updateUser',
	DELETE_USER = 'deleteUser',
	
}

export enum FORM_ACTIONS {
	LOGIN = `${PATHS.ROOT}?/${SERVER_FORM_ACTIONS.LOGIN}`,
	REGISTER = `${PATHS.ROOT}?/${SERVER_FORM_ACTIONS.REGISTER}`,
	SIGN_OUT = `${PATHS.PROFILE}?/${SERVER_FORM_ACTIONS.SIGN_OUT}`,
	UPDATE_USER = `${PATHS.PROFILE}?/${SERVER_FORM_ACTIONS.UPDATE_USER}`,
	DELETE_USER = `${PATHS.PROFILE}?/${SERVER_FORM_ACTIONS.DELETE_USER}`,
	
}
