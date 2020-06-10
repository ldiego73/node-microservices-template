import { HttpStatus } from "@nestjs/common";

export abstract class ResponseException {
  status: number;
  code: string;
  message: string;
  timestamp: string;

  constructor(status: number, message: string, code?: string) {
    this.status = status;
    this.message = message;
    this.code = code || this.constructor.name;
    this.timestamp = new Date().toISOString();
  }
}

export class BadRequestResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.BAD_REQUEST, message, code);
  }
}

export class UnauthorizedResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.UNAUTHORIZED, message, code);
  }
}

export class ForbiddenResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.FORBIDDEN, message, code);
  }
}

export class NotFoundResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.NOT_FOUND, message, code);
  }
}

export class ConflictResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.CONFLICT, message, code);
  }
}

export class UnprocessableEntityResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, message, code);
  }
}

export class FailResponseException extends ResponseException {
  constructor(message: string, code?: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, message, code);
  }
}
