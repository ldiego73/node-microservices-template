import { UniqueEntityId } from "@micro/kernel/lib/domain";
import { DataMapper } from "@micro/kernel/lib/infraestructure/mapper";

import { AddressFactory, CountryFactory, LatLngFactory } from "../../domain";
import { Address } from "../../domain/address";
import { GoogleAddress } from "../dtos";

export class AddressMapper implements DataMapper<Address> {
  toDomain(raw: GoogleAddress): Address {
    const latLng = LatLngFactory.createFrom(raw.latLng.lat, raw.latLng.lng);
    const country = CountryFactory.createFrom(raw.country);
    const address = AddressFactory.createFrom(
      {
        country,
        address: raw.description,
        latLng,
      },
      new UniqueEntityId(raw.id)
    );

    return address;
  }

  toPersistence(address: Address): GoogleAddress {
    return {
      country: address.country,
      description: address.address,
      latLng: {
        lat: address.lat,
        lng: address.lng,
      },
    } as GoogleAddress;
  }
}
