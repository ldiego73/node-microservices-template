/* eslint @typescript-eslint/explicit-module-boundary-types:0 */

import { UniqueEntityId } from "@micro/kernel/lib/domain";
import { DataMapper } from "@micro/kernel/lib/infraestructure/mapper";

import { Country } from "../../domain";
import { CountryFactory, IsoFactory } from "../../domain/factory";

export class CountryDataMapper implements DataMapper<Country> {
  toDomain(raw: any): Country {
    const iso = IsoFactory.createFrom(raw.iso);
    const country = CountryFactory.createFrom(
      {
        name: raw.name,
        iso: iso,
        currency: raw.currency,
        status: raw.status,
      },
      new UniqueEntityId(raw.id)
    );

    return country;
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
