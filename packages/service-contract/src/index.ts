import {
	extendZodWithOpenApi,
	OpenApiGeneratorV3,
	OpenAPIRegistry
} from '@asteasolutions/zod-to-openapi';
import * as fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { UserDTO, ZodErrorSchemaDTO } from './models';

extendZodWithOpenApi(z);
const registry = new OpenAPIRegistry();

const userIdSchema = registry.registerParameter(
	'userId',
	z.string().openapi({
		param: {
			name: 'userId',
			in: 'path'
		},
		example: '1212121'
	})
);

const Components = {
	User: 'User'
} as const;

const Tags = {
	User: 'User',
	Auth: 'Auth'
};
const sessionCookie = registry.registerComponent('securitySchemes', 'cookieAuth', {
	type: 'apiKey',
	in: 'cookie',
	name: 'auth_session	'
});

registry.registerPath({
	method: 'get',
	path: '/api/v1/user',
	description: 'Retrieves the currently logged in user',
	tags: [Tags.User],
	security: [{ [sessionCookie.name]: [] }],

	responses: {
		200: {
			description: 'Retrieves the currently logged in user',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

registry.registerPath({
	method: 'delete',
	path: '/api/v1/user',
	description: 'Retrieves the currently logged in user',
	tags: [Tags.User],
	security: [{ [sessionCookie.name]: [] }],

	responses: {
		200: {
			description: 'Retrieves the currently logged in user',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

registry.registerPath({
	method: 'get',
	path: '/api/v1/user/{userId}',
	description: 'Retrieves a specific User',
	tags: [Tags.User],
	security: [{ [sessionCookie.name]: [] }],
	request: {
		params: z.object({ userId: userIdSchema })
	},
	responses: {
		200: {
			description: 'The specific User.',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

registry.registerPath({
	method: 'put',
	path: '/api/v1/auth',
	description: 'Creates a new session for a user (authenticate)',
	tags: [Tags.Auth],
	security: [{ [sessionCookie.name]: [] }],

	request: {
		body: {
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		}
	},
	responses: {
		200: {
			description: 'The newly created user.',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});
registry.registerPath({
	method: 'post',
	path: '/api/v1/auth',
	description: 'Creates a new user (register)',
	tags: [Tags.Auth],
	security: [{ [sessionCookie.name]: [] }],

	request: {
		body: {
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		}
	},
	responses: {
		200: {
			description: 'The newly created user.',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});
registry.registerPath({
	method: 'delete',
	path: '/api/v1/auth',
	description: 'Close all sessions (log me out everywhere)',
	tags: [Tags.Auth],
	security: [{ [sessionCookie.name]: [] }],

	responses: {
		200: {
			description: 'Session Deleted.'
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

registry.registerPath({
	method: 'delete',
	path: '/api/v1/auth/{session}',
	description: 'Close a specific sessions (log me out here)',
	tags: [Tags.Auth],
	security: [{ [sessionCookie.name]: [] }],

	request: {
		body: {
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		}
	},
	responses: {
		200: {
			description: 'Session Deleted'
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

registry.registerPath({
	method: 'patch',
	path: '/api/v1/user',
	description: 'Updates an existing user',
	tags: [Tags.User],
	security: [{ [sessionCookie.name]: [] }],

	request: {
		body: {
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		}
	},
	responses: {
		200: {
			description: 'The updated user.',
			content: {
				'application/json': {
					schema: UserDTO.openapi(Components.User)
				}
			}
		},
		400: {
			description: 'Invalid input.',
			content: {
				'application/text': {
					schema: ZodErrorSchemaDTO
				}
			}
		},

		401: {
			description: 'Invalid Session.'
		},
		403: {
			description: 'Access denied.'
		},
		404: {
			description: 'Resource not found.'
		}
	}
});

function getOpenApiDocumentation() {
	const generator = new OpenApiGeneratorV3(registry.definitions);

	return generator.generateDocument({
		openapi: '3.1.0',
		info: {
			version: '0.0.1',
			title: 'CloudKit API',
			description:
				'This is the API for CloudKit. All endpoints are only available to authenticated users and require a valid session. Additionally they are all rate limited.',

			contact: {
				name: 'Daniel Einars',
				email: 'daniel@cloudkit.dle.dev'
			}
		},

		servers: [
			{
				url: 'https://cloudkit.dle.dev/api/v1',
				description: 'Production'
			}
		]
	});
}

function writeDocumentation() {
	// OpenAPI JSON
	const docs = getOpenApiDocumentation();

	// YAML equivalent

	const outputPath = path.join(__dirname, '../dist');
	//create the directory if it doesn't exist using path
	if (fs.existsSync(outputPath)) {
		fs.rmSync(outputPath, {
			recursive: true,
			force: true
		});
	}
	fs.mkdirSync(outputPath, {
		recursive: true
	});

	fs.writeFileSync(`${outputPath}/cloudkit-openapi-docs.json`, JSON.stringify(docs, null, 2), {
		encoding: 'utf-8'
	});
}

writeDocumentation();
