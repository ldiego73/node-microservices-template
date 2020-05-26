import { Logger } from '@micro/logger';
import {
  ResponseException,
  BadRequestResponseException,
  UnauthorizedResponseException,
  ForbiddenResponseException,
  NotFoundResponseException,
  ConflictResponseException,
  UnprocessableEntityResponseException,
  FailResponseException,
} from '../exceptions/response.exception';

export abstract class BaseController {
  protected log: Logger;

  constructor() {
    this.log = Logger.create(this.constructor.name);
  }

  private throwException(exception: ResponseException): void {
    throw exception;
  }

  protected bad(message: string, code?: string): void {
    this.throwException(new BadRequestResponseException(message, code));
  }

  protected unauthorized(message: string, code?: string): void {
    this.throwException(new UnauthorizedResponseException(message, code));
  }

  protected forbidden(message: string, code?: string): void {
    this.throwException(new ForbiddenResponseException(message, code));
  }

  protected notFound(message: string, code?: string) {
    this.throwException(new NotFoundResponseException(message, code));
  }

  protected conflict(message: string, code?: string) {
    this.throwException(new ConflictResponseException(message, code));
  }

  protected unprocessableEntity(message: string, code?: string) {
    this.throwException(
      new UnprocessableEntityResponseException(message, code)
    );
  }

  protected fail(message: string, code?: string) {
    this.throwException(new FailResponseException(message, code));
  }
}
