import { Failure } from '@micro/kernel/lib/result';
import { DomainError } from '@micro/kernel/lib/domain/domain.error';

export class CountryInvalidError extends Failure<DomainError> {
  public constructor(field: string) {
    super({ message: `The Country is invalid => ${field}` });
  }

  public static create(field: string) {
    return new CountryInvalidError(field);
  }
}
