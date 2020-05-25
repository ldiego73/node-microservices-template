import { RouteOptions } from 'fastify';

import { listRoute } from './list/list.route';
import { findRoute } from './find/find.route';
import { createRoute } from './create/create.route';
import { updateRoute } from './update/update.route';
import { deleteRoute } from './delete/delete.route';

export const routes: RouteOptions[] = [
  listRoute,
  findRoute,
  createRoute,
  updateRoute,
  deleteRoute,
];
