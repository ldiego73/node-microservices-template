import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { FastifyReply, FastifyRequest } from "fastify";
import { ServerResponse } from "http";

import { BaseExceptionFilter, Response } from "./base.exception.filter";

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter
  implements ExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: Response, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();

    const result = this.createException(exception, req.raw.url);

    res.code(result.status).send(result);
  }
}
