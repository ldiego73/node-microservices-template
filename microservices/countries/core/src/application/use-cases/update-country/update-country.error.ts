import { DomainError } from '@micro/kernel/lib/domain';

export class CountryNotExistsError extends DomainError {
  public constructor(iso: string, error: unknown) {
    super(`The country ${iso} not exists`, error);
  }

  public static create(iso: string, error: unknown): CountryNotExistsError {
    return new CountryNotExistsError(iso, error);
  }
}
