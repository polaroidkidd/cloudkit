import { PrismaClient as PrismaClientNode, Prisma as PrismaNode } from '@prisma/client';
import { PrismaClient as PrismaClientEdge, Prisma as PrismaEdge } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

import { DATABASE_URL } from '$env/static/private';
import { isDevOrCi } from '@cloudkit/ui-core';

const prismaConfiguration = {
	datasources: {
		db: {
			url: DATABASE_URL
		}
	}
};

export const db = isDevOrCi
	? new PrismaClientNode(prismaConfiguration).$extends(withAccelerate())
	: new PrismaClientEdge(prismaConfiguration).$extends(withAccelerate());

export const PrismaClientKnownRequestError = isDevOrCi
	? PrismaNode.PrismaClientKnownRequestError
	: PrismaEdge.PrismaClientKnownRequestError;
