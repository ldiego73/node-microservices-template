import fastify, { FastifyInstance, ServerOptionsAsSecureHttp2 } from 'fastify';
import { readEnv } from '@micro/countries-config';
import { Logger } from '@micro/logger';
import { options } from './core';
import { routes } from './modules';

const env = readEnv();
const { key, cert } = env.server.https!;
const serverOptions = options(key, cert);
const log = Logger.create('Server');
const server: FastifyInstance = fastify(serverOptions);

routes.forEach(r => {
  server.route(r);
});

server.listen(env.server.port, '0.0.0.0', (err: Error, address: string) => {
  if (err) {
    log.error('Server error', err);
    process.exit(0);
  }
  log.info(`Server listening at ${address}`);
});
