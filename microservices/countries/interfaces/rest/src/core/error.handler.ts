import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { ErrorResponse } from './error.response';

export const errorHandler = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply<ServerResponse>
) => {
  const path = req.raw.url;
  const status = res.res.statusCode || err.statusCode || 500;

  const response: ErrorResponse = {
    status,
    title: err.message || 'Internal error server',
    type: 'about:blank',
    detail: err.stack || '',
    instance: path || '',
  };

  res.code(status).send(response);
};
