import { RouteOptions } from 'fastify';
import { UpdateController } from './update.controller';
import { updateSchema } from './update.schema';
import { updateCountryUseCase } from '@micro/countries-core/lib/application/use-cases/update-country';

const controller = new UpdateController(updateCountryUseCase);

export const updateRoute: RouteOptions = {
  method: 'PUT',
  url: '/:iso',
  schema: updateSchema,
  handler: async (request, reply) => {
    return await controller.execute(request, reply);
  },
};
