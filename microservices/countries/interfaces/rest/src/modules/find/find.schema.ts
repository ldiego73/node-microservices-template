import { RouteSchema } from 'fastify';

export const findSchema: RouteSchema = {
  params: {
    type: 'object',
    properties: {
      iso: { type: 'string', minLength: 2, maxLength: 2 },
    },
  },
};
