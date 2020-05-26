import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import compression from 'fastify-compress';
import rateLimit from 'fastify-rate-limit';

import { readEnv } from '@micro/countries-config';
import { Logger } from '@micro/logger';

import { options, HttpExceptionFilter } from './core';
import { AppModule } from './modules/app.module';

const env = readEnv();
const { key, cert } = env.server.https!;
const log = Logger.create('Server');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(options(key, cert))
  );

  app.register(helmet);
  app.register(cors);
  app.register(compression, { encodings: ['gzip', 'deflate'] });
  app.register(rateLimit, { max: 100, timeWindow: '1 minute' });

  await app.listen(env.server.port);

  log.info(`Server listening at ${await app.getUrl()}`);
}

bootstrap();
