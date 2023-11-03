/// <reference types="lucia" />
declare global {
	namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		interface Platform {
			env: {
				CLOUDKIT_KV: KVNamespace;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}
	}

	interface Locals {
		auth: import('lucia').AuthRequest;
	}
	namespace Lucia {
		type Auth = import('$lib/server/auth/lucia').Auth;
		type DatabaseUserAttributes = {
			firstName: string;
			lastName: string;
			email: string;
			bio: string | null;
			avatarId: string;
			createdAt: Date;
			updatedAt: Date;
			id: string;
			verified: boolean;
		};
	}
}

export {};
