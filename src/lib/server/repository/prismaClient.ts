import { DATABASE_URL } from '$env/static/private';
import { Prisma, PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
});

export const PrismaClientKnownRequestError = Prisma.PrismaClientKnownRequestError;
