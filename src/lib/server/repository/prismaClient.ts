import { dev } from '$app/environment';
import { DATABASE_URL } from '$env/static/private';
import { isDev } from '@lib/utils/general';
import { PrismaClient as PrismaClientNode, Prisma as PrismaNode } from '@prisma/client';
import { PrismaClient as PrismaClientEdge, Prisma as PrismaEdge } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaConfiguration = {
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
};

export const db = isDev
	? new PrismaClientNode(prismaConfiguration).$extends(withAccelerate())
	: new PrismaClientEdge(prismaConfiguration).$extends(withAccelerate());

export const PrismaClientKnownRequestError = dev
	? PrismaNode.PrismaClientKnownRequestError
	: PrismaEdge.PrismaClientKnownRequestError;
