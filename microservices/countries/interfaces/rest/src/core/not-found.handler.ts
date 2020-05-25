import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { ErrorResponse } from './error.response';

export const notFoundHandler = (
  req: FastifyRequest,
  res: FastifyReply<ServerResponse>
) => {
  const path = req.raw.url;
  const status = 400;
  const message = `Resource '${path}' was not found`;

  const response: ErrorResponse = {
    status,
    title: 'Not found',
    type: 'about:blank',
    detail: message,
    instance: path || '',
  };

  res.code(status).send(response);
};
