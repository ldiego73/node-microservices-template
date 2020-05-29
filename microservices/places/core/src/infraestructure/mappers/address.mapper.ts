import { Mapper } from '@micro/kernel/lib/infraestructure/mapper';
import { Address } from '../../domain/address';
import { GoogleAddress } from '../dtos';
import { UniqueEntityId } from '@micro/kernel/lib/domain';
import { LatLng } from '../../domain/lat-lng';
import { Country } from '../../domain/country';

export class AddressMapper implements Mapper<Address> {
  toDomain(raw: GoogleAddress): Address {
    const latLngOrError = LatLng.create(raw.latLng.lat, raw.latLng.lng);
    const countryOrError = Country.create(raw.country);
    const latLng = latLngOrError.value;
    const country = countryOrError.value;
    const addressOrError = Address.create(
      {
        country,
        address: raw.description,
        latLng,
      },
      new UniqueEntityId(raw.id)
    );

    return addressOrError.value;
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
