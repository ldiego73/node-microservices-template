import { DomainError } from '@micro/kernel/lib/domain';

export class CountryInvalidError extends DomainError {
  public constructor(field: string) {
    super(`The Country is invalid => ${field}`);
  }

  public static create(field: string) {
    return new CountryInvalidError(field);
  }
}
