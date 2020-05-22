import { Failure } from '@micro/kernel/lib/result';
import { UseCaseError } from '@micro/kernel/lib/application/use-case.error';

export class CountryNotExistsError extends Failure<UseCaseError> {
  public constructor(iso: string, error: any) {
    super({
      message: `The country ${iso} not exists`,
      error,
    });
  }

  public static create(iso: string, error: any): CountryNotExistsError {
    return new CountryNotExistsError(iso, error);
  }
}
