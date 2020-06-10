import { DomainError } from "@micro/kernel/lib/domain";

export class LatitudeInvalidError extends DomainError {
  public constructor(field: string) {
    super("LATITUDE_INVALID", `The latitude is invalid => ${field}`);
  }

  public static create(field: string): LatitudeInvalidError {
    return new LatitudeInvalidError(field);
  }
}
