import { Address } from "../../domain";
import { AddressDto } from "../dtos";

export class AddressMapper {
  toDto(address: Address): AddressDto {
    return {
      id: address.id.toValue(),
      country: address.country,
      description: address.address,
      latLng: {
        lat: address.lat,
        lng: address.lng,
      },
    } as AddressDto;
  }

  toCollection(address: Address[]): AddressDto[] {
    return address.map((a) => this.toDto(a));
  }
}
