import { Country } from "../../domain";
import { CountryDto } from "../dtos";

export class CountryMapper {
  toDto(country: Country): CountryDto {
    return {
      name: country.name,
      iso: country.iso,
      currency: country.currency,
      status: country.status,
    } as CountryDto;
  }

  toCollection(country: Country[]): CountryDto[] {
    return country.map((c) => this.toDto(c));
  }
}
