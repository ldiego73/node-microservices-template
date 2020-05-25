import { DomainError } from '@micro/kernel/lib/domain';

export class CountryNotExistsError extends DomainError {
  public constructor(iso: string, error: any) {
    super(`The country ${iso} not exists`, error);
  }

  public static create(iso: string, error: any): CountryNotExistsError {
    return new CountryNotExistsError(iso, error);
  }
}
