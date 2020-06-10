import { DomainError } from "@micro/kernel/lib/domain";

export class IsoInvalidError extends DomainError {
  public constructor(iso: string) {
    super("ISO_INVALID", `The ISO "${iso}" is not formatted correctly`);
  }

  public static create(iso: string): IsoInvalidError {
    return new IsoInvalidError(iso);
  }
}
