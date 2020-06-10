import { Logger } from "@micro/logger";
import { isObject } from "@micro/utils";
import { HttpException, HttpStatus } from "@nestjs/common";

import { Exception, ResponseException } from "../exceptions";

export type Response = HttpException | ResponseException | Error | string;

export abstract class BaseExceptionFilter {
  protected logger: Logger;

  constructor() {
    this.logger = Logger.create(this.constructor.name);
  }

  protected createException(exception: Response, path?: string): Exception {
    let response: Exception;

    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      response = {
        status: exception.getStatus(),
        message: exception.message,
        code: isObject(res) ? (res as any).error : exception.name,
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

    if (!response.timestamp) response.timestamp = new Date().toISOString();
    if (path) response.path = path;

    return response;
  }
}
