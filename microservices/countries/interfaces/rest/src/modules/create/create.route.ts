import { RouteOptions } from 'fastify';
import { CreateController } from './create.controller';
import { createSchema } from './create.schema';
import { createCountryUseCase } from '@micro/countries-core/lib/application/use-cases/create-country';

const controller = new CreateController(createCountryUseCase);

export const createRoute: RouteOptions = {
  method: 'POST',
  url: '/',
  schema: createSchema,
  handler: async (request, reply) => {
    return await controller.execute(request, reply);
  },
};
