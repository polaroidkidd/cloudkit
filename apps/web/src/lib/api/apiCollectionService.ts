import type { Collection } from '@cloudkit/ui-core';
import { ApiServiceBase } from './baseApiService';

class CollectionServiceApi extends ApiServiceBase {
	constructor() {
		super('/api/collections');
	}

	createCollection(data: Collection): Promise<Collection> {
		return this.http.post('/', data);
	}
	deleteCollection(collectionId: string) {
		return this.http.delete(`/${collectionId}`);
	}
	updateCollection(collectionId: string, collection: string, parentId?: string) {
		return this.http.put(`/${collectionId}`, { collection, parentId });
	}

	moveCollection(collectionId: string, newParentId: string) {
		return this.http.patch(`/${collectionId}`, { newParentId });
	}

	addItemsToCollection(collectionId: string, items: FileList) {
		return this.http.post(`/${collectionId}/items`, { items });
	}
	deleteItemFromCollection(collectionId: string, items: string) {
		return this.http.delete(`/${collectionId}/items`, { params: { items } });
	}

	moveItemsToCollection(collectionId: string, items: string[], newParentId: string) {
		return this.http.patch(`/${collectionId}/items`, { items, newParentId });
	}
}

const api = Object.freeze(new CollectionServiceApi());
export { api as CollectionServiceApi };
