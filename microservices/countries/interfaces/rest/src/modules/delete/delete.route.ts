import { RouteOptions } from 'fastify';
import { DeleteController } from './delete.controller';
import { deleteSchema } from './delete.schema';
import { deleteCountryUseCase } from '@micro/countries-core/lib/application/use-cases/delete-country';

const controller = new DeleteController(deleteCountryUseCase);

export const deleteRoute: RouteOptions = {
  method: 'DELETE',
  url: '/:iso',
  schema: deleteSchema,
  handler: async (request, reply) => {
    return await controller.execute(request, reply);
  },
};
