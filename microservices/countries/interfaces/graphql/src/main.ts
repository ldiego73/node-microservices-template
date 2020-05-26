import cors from 'fastify-cors';
import rateLimit from 'fastify-rate-limit';

import { Server } from '@micro/server';
import { readEnv } from '@micro/countries-config';

import { AppModule } from './modules/app.module';

const env = readEnv();
const { key, cert } = env.server.https!;

async function bootstrap() {
  const server = Server.create(AppModule, {
    port: env.server.port,
    graphql: true,
    https: { key, cert },
  });

  server.register(cors);
  server.register(rateLimit, { max: 100, timeWindow: '1 minute' });

  await server.start();
}

bootstrap();
