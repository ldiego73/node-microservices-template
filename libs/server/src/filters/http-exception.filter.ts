import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { Exception, ResponseException } from '../exceptions/response.exception';

type Response = HttpException | ResponseException | Error | string;

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Response, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<FastifyRequest>();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();

    const result = this.createException(exception);

    if (!result.timestamp) result.timestamp = new Date().toISOString();
    if (!req.raw.url) result.path = req.raw.url;

    res.code(result.status).send(result);
  }

  createException(exception: Response): Exception {
    let response: Exception;

    if (exception instanceof HttpException) {
      response = {
        status: exception.getStatus(),
        message: exception.message,
        code: exception.name,
      };
    } else if (exception instanceof ResponseException) {
      response = {
        status: exception.status,
        message: exception.message,
        code: exception.code,
        timestamp: exception.timestamp,
      };
    } else if (exception instanceof Error) {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message,
        code: exception.name,
      };
    } else {
      response = {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception,
      };
    }

    return response;
  }
}
