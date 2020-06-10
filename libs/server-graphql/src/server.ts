import { BaseServer, ServerOptions } from "@micro/server/lib/core";
import { HttpExceptionFilter } from "@micro/server/lib/filters";

import { GraphQlExceptionFilter } from "./filters";

export class Server extends BaseServer {
  protected async bootstrap(appModule: unknown): Promise<void> {
    await this.defaultBootstrap(appModule);

    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useGlobalFilters(new GraphQlExceptionFilter());
  }

  public static create(appModule: unknown, options: ServerOptions): Server {
    return new Server(appModule, options);
  }
}
