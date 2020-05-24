import { DomainError } from '@micro/kernel/lib/domain';

export class CountryAlreadyExistsError extends DomainError {
  public constructor(iso: string, error: any) {
    super(`The country ${iso} associated already exists`, error);
  }

  public static create(iso: string, error: any): CountryAlreadyExistsError {
    return new CountryAlreadyExistsError(iso, error);
  }
}
