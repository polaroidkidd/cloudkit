export class AccessDeniedError extends Error {
	constructor(resource: string) {
		super(`Access denied to ${resource}`);
	}
}

export class InvalidSessionError extends Error {
	constructor() {
		super('Invalid Session');
	}
}

export class ResourceNotFoundError extends Error {
	constructor(resource: string) {
		super(`Resources not found: ${resource}`);
	}
}

export class CollectionAlreadyExistsError extends Error {
	constructor(collectionName: string) {
		super(`Collection with this name already exists: ${collectionName}`);
	}
}
