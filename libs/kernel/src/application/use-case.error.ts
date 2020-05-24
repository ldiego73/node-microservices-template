import { Failure } from '../result';
import { DomainError } from '../domain';

export class UseCaseUnexpectedError extends Failure<DomainError> {
  public constructor(error: any) {
    super({
      message: 'An unexpected error occurred.',
      error,
    });
  }

  public static create(error: any): UseCaseUnexpectedError {
    return new UseCaseUnexpectedError(error);
  }
}
