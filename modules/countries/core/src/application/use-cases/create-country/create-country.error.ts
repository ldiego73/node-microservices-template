import { Failure } from '@micro/kernel/lib/result';
import { UseCaseError } from '@micro/kernel/lib/application/use-case.error';

export class CountryAlreadyExistsError extends Failure<UseCaseError> {
  public constructor(iso: string, error: any) {
    super({
      message: `The country ${iso} associated already exists`,
      error,
    });
  }

  public static create(iso: string, error: any): CountryAlreadyExistsError {
    return new CountryAlreadyExistsError(iso, error);
  }
}
