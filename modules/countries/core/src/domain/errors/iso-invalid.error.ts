import { Failure } from '@micro/kernel/lib/result';
import { DomainError } from '@micro/kernel/lib/domain/domain.error';

export class IsoInvalidError extends Failure<DomainError> {
  public constructor(iso: string) {
    super({
      message: `The ISO "${iso}" is not formatted correctly`,
    });
  }

  public static create(iso: string): IsoInvalidError {
    return new IsoInvalidError(iso);
  }
}
