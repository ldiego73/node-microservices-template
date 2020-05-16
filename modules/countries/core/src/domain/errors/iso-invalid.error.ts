import { DomainError, Failure } from '@micro/kernel';

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
