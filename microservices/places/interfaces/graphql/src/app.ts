/* eslint @typescript-eslint/no-non-null-assertion:0 */

import { MicroApplication } from "@micro/kernel";
import { readEnv } from "@micro/places-config";
import { Server } from "@micro/server-graphql";
import cors from "fastify-cors";
import rateLimit from "fastify-rate-limit";

import { AppModule } from "./modules/app.module";

export class PlaceGraphqlApplication extends MicroApplication {
  async start(): Promise<void> {
    const env = readEnv();
    const { key, cert } = env.server.https!;
    const server = Server.create(AppModule, {
      port: env.server.port,
      https: { key, cert },
    });

    server.register(cors);
    server.register(rateLimit, { max: 100, timeWindow: "1 minute" });

    await server.start();
  }
}
