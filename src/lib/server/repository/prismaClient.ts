import { DATABASE_URL, DATA_PROXY, IS_CI } from '$env/static/private';
import { Prisma as PrismaEdge, PrismaClient as PrismaClientEdge } from '@prisma/client/edge';
import { Prisma as PrismaNode, PrismaClient as PrismaClientNode } from '@prisma/client';
import { dev } from '$app/environment';

const prismaConfiguration = {
	datasources: {
		db: {
			url: dev || IS_CI === 'true' ? DATABASE_URL : DATA_PROXY
		}
	}
};

export const db = dev
	? new PrismaClientNode(prismaConfiguration)
	: new PrismaClientEdge(prismaConfiguration);

export const PrismaClientKnownRequestError = dev
	? PrismaNode.PrismaClientKnownRequestError
	: PrismaEdge.PrismaClientKnownRequestError;
