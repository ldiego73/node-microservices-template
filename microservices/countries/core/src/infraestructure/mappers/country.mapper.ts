import { Mapper } from '@micro/kernel/lib/infraestructure/mapper';
import { UniqueEntityId } from '@micro/kernel';
import { Country, Iso } from '../../domain';

export class CountryMapper implements Mapper<Country> {
  toDomain(raw: any): Country {
    const isoOrError = Iso.create(raw.iso);
    const iso = isoOrError.value;

    const countryOrError = Country.create(
      {
        name: raw.name,
        iso: iso,
        currency: raw.currency,
        status: raw.status,
      },
      new UniqueEntityId(raw.id)
    );

    return countryOrError.value;
  }

  toPersistence(country: Country): any {
    return {
      id: country.id.toValue(),
      name: country.name,
      iso: country.iso,
      currency: country.currency,
      status: country.status,
    };
  }
}
