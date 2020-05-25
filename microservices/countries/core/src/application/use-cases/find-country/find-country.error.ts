import { DomainError } from '@micro/kernel/lib/domain';

export class FindCountryError extends DomainError {
  public constructor(iso: string) {
    super(`The country "${iso}" not exists`);
  }

  public static create(iso: string): FindCountryError {
    return new FindCountryError(iso);
  }
}
