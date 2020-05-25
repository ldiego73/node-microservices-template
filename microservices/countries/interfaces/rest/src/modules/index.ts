import { RouteOptions } from 'fastify';

import { listRoute } from './list/list.route';
import { findRoute } from './find/find.route';

export const routes: RouteOptions[] = [listRoute, findRoute];
