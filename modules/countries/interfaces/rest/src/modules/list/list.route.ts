import { RouteOptions } from 'fastify';
import { ListController } from './list.controller';
import { listCountryUseCase } from '@micro/countries-core/lib/application/use-cases/list-country';

const controller = new ListController(listCountryUseCase);

export const listRoute: RouteOptions = {
  method: 'GET',
  url: '/',
  handler: async (request, reply) => {
    return await controller.execute(request, reply);
  },
};
