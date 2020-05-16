import { Transform } from '@micro/kernel/lib/application';
import { Country } from '@domain/index';
import { CountryDto } from '@application/dtos/index';

export class CountryTransform implements Transform<Country, CountryDto> {
  toDto(country: Country): CountryDto {
    return {
      name: country.name,
      iso: country.iso,
      currency: country.currency,
      status: country.status,
    } as CountryDto;
  }

  toCollection(country: Country[]): CountryDto[] {
    return country.map(c => this.toDto(c));
  }
}
