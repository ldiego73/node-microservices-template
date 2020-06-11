import { DomainError } from "@micro/kernel/lib/domain";

export class CountryInvalidError extends DomainError {
  public constructor(country: string) {
    super(
      "COUNTRY_INVALID",
      `The country "${country}" is not formatted correctly`
    );
  }

  public static create(iso: string): CountryInvalidError {
    return new CountryInvalidError(iso);
  }
}
