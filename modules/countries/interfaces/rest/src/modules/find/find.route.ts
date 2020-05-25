import { RouteOptions } from 'fastify';
import { FindController } from './find.controller';
import { findSchema } from './find.schema';
import { findCountryUseCase } from '@micro/countries-core/lib/application/use-cases/find-country';

const controller = new FindController(findCountryUseCase);

export const findRoute: RouteOptions = {
  method: 'GET',
  url: '/:iso',
  schema: findSchema,
  handler: async (request, reply) => {
    return await controller.execute(request, reply);
  },
};
