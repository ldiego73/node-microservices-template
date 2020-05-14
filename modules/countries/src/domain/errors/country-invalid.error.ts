import { DomainError, Failure } from '@micro/kernel';

export class CountryInvalidError extends Failure<DomainError> {
  public constructor(field: string) {
    super({ message: `The Country is invalid => ${field}` });
  }

  public static create(field: string) {
    return new CountryInvalidError(field);
  }
}
