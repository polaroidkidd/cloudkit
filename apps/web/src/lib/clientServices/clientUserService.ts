import type { UserWithRelations } from '@cloudkit/ui-core';

class ClientUserService {
	
	createUser(name: string) {
		throw new Error('Function not yet implemented ' + name);
	}
	updateUser(User: UserWithRelations) {
		throw new Error('Function not yet implemented' + User.firstName);
	}
	deleteUser(User: UserWithRelations) {
		throw new Error('Function not yet implemented' + User.firstName);
	}


}

const forzen = Object.freeze(new ClientUserService());
export { forzen as clientUserService };
