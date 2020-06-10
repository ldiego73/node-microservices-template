import { Logger } from "@micro/logger";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ServerOptionsAsSecureHttp } from "fastify";
import compression from "fastify-compress";
import helmet from "fastify-helmet";
import fs from "fs";
import path from "path";

import { ServerOptions } from "./options";

const readCert = (cert: string): Buffer =>
  fs.readFileSync(path.join(process.cwd(), cert));

export abstract class BaseServer {
  protected log: Logger;
  protected app!: NestFastifyApplication;
  protected plugins: any[] = [];
  protected readonly appModule: unknown;
  protected readonly options: ServerOptions;

  protected constructor(appModule: unknown, options: ServerOptions) {
    if (appModule === null || appModule === undefined) {
      throw new Error("Unable to retrieve app module");
    }

    this.log = Logger.create(this.constructor.name);
    this.appModule = appModule;
    this.options = Object.assign(
      {
        port: 3000,
        logger: true,
        stack: true,
      } as ServerOptions,
      options
    );
  }

  protected createHttpsOptions(): ServerOptionsAsSecureHttp {
    if (this.options.https) {
      return {
        https: {
          allowHTTP1: true,
          key: readCert(this.options.https.key),
          cert: readCert(this.options.https.cert),
        },
      };
    } else {
      throw new Error("Unable to retrieve https values");
    }
  }

  protected adapter(): FastifyAdapter {
    let adapter: FastifyAdapter;

    if (!this.options.https) {
      adapter = new FastifyAdapter();
    } else {
      adapter = new FastifyAdapter(this.createHttpsOptions());
    }

    return adapter;
  }

  public register(...args: any[]): void {
    this.plugins.push(args);
  }

  protected async defaultBootstrap(appModule: unknown): Promise<void> {
    this.app = await NestFactory.create<NestFastifyApplication>(
      appModule,
      this.adapter(),
      {
        logger: this.options.logger ? ["error", "warn"] : false,
      }
    );

    this.app.register(helmet);
    this.app.register(compression, { encodings: ["gzip", "deflate"] });

    this.plugins.forEach((p) => {
      this.app.register(...p);
    });
  }

  protected abstract bootstrap(appModule: unknown): Promise<void>;

  public async start(): Promise<void> {
    await this.bootstrap(this.appModule);
    await this.app.listen(this.options.port);

    this.log.info(`Server listening at ${await this.app.getUrl()}`);
  }
}
