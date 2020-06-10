import { DomainError } from "@micro/kernel/lib/domain";

export class CountryInvalidError extends DomainError {
  public constructor(field: string) {
    super("COUNTRY_INVALID", `The Country is invalid => ${field}`);
  }

  public static create(field: string): CountryInvalidError {
    return new CountryInvalidError(field);
  }
}
