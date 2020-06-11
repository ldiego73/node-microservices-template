import { DomainError } from "@micro/kernel/lib/domain";

export class LongitudeInvalidError extends DomainError {
  public constructor(field: string) {
    super("LONGITUDE_INVALID", `The longitude is invalid => ${field}`);
  }

  public static create(field: string): LongitudeInvalidError {
    return new LongitudeInvalidError(field);
  }
}
