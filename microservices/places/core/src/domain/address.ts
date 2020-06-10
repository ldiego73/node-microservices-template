import { Entity, UniqueEntityId } from "@micro/kernel/lib/domain";

import { Country } from "./country";
import { LatLng } from "./lat-lng";

export interface AddressProps {
  country: Country;
  address: string;
  latLng: LatLng;
}

export class Address extends Entity<AddressProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get country(): string {
    return this.props.country.value;
  }

  get address(): string {
    return this.props.address;
  }

  get lat(): string {
    return this.props.latLng.lat;
  }

  get lng(): string {
    return this.props.latLng.lng;
  }

  constructor(props: AddressProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
