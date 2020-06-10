import { DomainError } from "@micro/kernel/lib/domain";

export class CountryAlreadyExistsError extends DomainError {
  public constructor(iso: string, error: unknown) {
    super(
      "COUNTRY_ALREADY_EXISTS",
      `The country ${iso} associated already exists`,
      error
    );
  }

  public static create(iso: string, error: unknown): CountryAlreadyExistsError {
    return new CountryAlreadyExistsError(iso, error);
  }
}
