declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
	}
}

export {};

// /// <reference types="svelte-adapter-azure-swa" />

// import type { Group, Image } from '@prisma/client';

// /// <reference types="lucia" />
// declare global {
// 	namespace App {
// 		interface Locals {
// 			auth: import('lucia').AuthRequest;
// 			user: Lucia.UserAttributes;
// 		}
// 	}
// 	namespace Lucia {
// 		type Auth = import('$lib/server/auth/lucia').Auth;
// 		type DatabaseUserAttributes = {
// 			firstName: string;
// 			lastName: string;
// 			email: string;
// 			verified: boolean;
// 			createdAt: Date;
// 			updatedAt: Date;
// 			groups: Group[];
// 			avatar: Image | null;
// 		};
// 		type DatabaseSessionAttributes = {
// 			firstName: string;
// 			lastName: string;
// 			email: string;
// 			verified: boolean;
// 			createdAt: Date;
// 			updatedAt: Date;
// 			groups: Group[];
// 			avatar: Image | null;
// 		};
// 	}
// }

// // THIS IS IMPORTANT!!!
// export {};
