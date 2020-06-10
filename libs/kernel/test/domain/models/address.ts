import { Entity } from "../../../src/domain/entity";
import { UniqueEntityId } from "../../../src/domain/unique-entity-id";

interface AddressProps {
  address: string;
  city: string;
  latitude: string;
  longitude: string;
}

export class Address extends Entity<AddressProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get address(): string {
    return this.props.address;
  }

  get city(): string {
    return this.props.city;
  }

  get latitude(): string {
    return this.props.latitude;
  }

  get longitude(): string {
    return this.props.longitude;
  }

  public static create(props: AddressProps, id?: UniqueEntityId): Address {
    return new Address(props, id);
  }
}
