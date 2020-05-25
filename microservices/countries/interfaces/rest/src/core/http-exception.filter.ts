import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { isString, toType } from '@micro/utils';
import { ErrorResponse } from './error.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();
    const req = ctx.getRequest<FastifyRequest>();

    let status: number;
    let title: string;
    let detail: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      title = exception.message;
      detail = exception.stack ?? '';
    } else if (isString(exception)) {
      status = HttpStatus.BAD_REQUEST;
      title = exception as string;
      detail = '';
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      title = 'Internal error server';
      detail = '';
    }

    const path = req.raw.url;

    const response: ErrorResponse = {
      status,
      title,
      type: 'about:blank',
      detail,
      instance: path || '',
    };

    res.code(status).send(response);
  }
}
