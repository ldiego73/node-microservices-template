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

import { ServerOptions } from "./core";
import { GraphQlExceptionFilter } from "./filters/graphql-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

const readCert = (cert: string): Buffer =>
  fs.readFileSync(path.join(process.cwd(), cert));

export class Server {
  protected log: Logger;
  private app!: NestFastifyApplication;
  private plugins: any[] = [];
  private readonly appModule: unknown;
  private readonly options: ServerOptions;

  private constructor(appModule: unknown, options: ServerOptions) {
    if (appModule === null || appModule === undefined) {
      throw new Error("Unable to retrieve app module");
    }

    this.log = Logger.create(this.constructor.name);
    this.appModule = appModule;
    this.options = Object.assign(
      {
        port: 3000,
        logger: true,
        graphql: false,
        stack: true,
      } as ServerOptions,
      options
    );
  }

  private createHttpsOptions(): ServerOptionsAsSecureHttp {
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

  private adapter(): FastifyAdapter {
    let adapter: FastifyAdapter;

    if (!this.options.https) {
      adapter = new FastifyAdapter();
    } else {
      adapter = new FastifyAdapter(this.createHttpsOptions());
    }

    return adapter;
  }

  private async bootstrap(appModule: unknown) {
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

    if (this.options.graphql)
      this.app.useGlobalFilters(new GraphQlExceptionFilter());
    else this.app.useGlobalFilters(new HttpExceptionFilter());
  }

  public register(...args: any[]): void {
    this.plugins.push(args);
  }

  public async start(): Promise<void> {
    await this.bootstrap(this.appModule);
    await this.app.listen(this.options.port);

    this.log.info(`Server listening at ${await this.app.getUrl()}`);
  }

  public static create(appModule: unknown, options: ServerOptions): Server {
    return new Server(appModule, options);
  }
}
