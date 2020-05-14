import { Failure } from '../result';

export interface UseCaseError {
  message: string;
  error: any;
}

export class UseCaseUnexpectedError extends Failure<UseCaseError> {
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
