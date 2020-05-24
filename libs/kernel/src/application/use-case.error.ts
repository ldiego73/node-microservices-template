import { DomainError } from '../domain';

export class UseCaseUnexpectedError extends DomainError {
  public constructor(error: any) {
    super('An unexpected error occurred.', error);
  }

  public static create(error: any): UseCaseUnexpectedError {
    return new UseCaseUnexpectedError(error);
  }
}
