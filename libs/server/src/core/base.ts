import { Logger } from "@micro/logger";

import {
  BadRequestResponseException,
  ConflictResponseException,
  FailResponseException,
  ForbiddenResponseException,
  NotFoundResponseException,
  ResponseException,
  UnauthorizedResponseException,
  UnprocessableEntityResponseException,
} from "../exceptions/http.exception";

export abstract class Base {
  protected logger: Logger;

  constructor() {
    this.logger = Logger.create(this.constructor.name);
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

  protected notFound(message: string, code?: string): void {
    this.throwException(new NotFoundResponseException(message, code));
  }

  protected conflict(message: string, code?: string): void {
    this.throwException(new ConflictResponseException(message, code));
  }

  protected unprocessableEntity(message: string, code?: string): void {
    this.throwException(
      new UnprocessableEntityResponseException(message, code)
    );
  }

  protected fail(message: string, code?: string): void {
    this.throwException(new FailResponseException(message, code));
  }
}
