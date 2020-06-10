import { DomainError } from "@micro/kernel/lib/domain";

export class CountryNotFoundError extends DomainError {
  public constructor(iso: string) {
    super("COUNTRY_NOT_FOUND", `The country "${iso}" not exists`);
  }

  public static create(iso: string): CountryNotFoundError {
    return new CountryNotFoundError(iso);
  }
}
