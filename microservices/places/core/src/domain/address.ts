import { Entity, UniqueEntityId } from "@micro/kernel/lib/domain";
import { Either,Result } from "@micro/kernel/lib/result";
import { Schema } from "@micro/utils";
import * as validator from "@micro/utils";

import { Country } from "./country";
import { AddressInvalidError } from "./errors";
import { LatLng } from "./lat-lng";

interface AddressProps {
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

  private constructor(props: AddressProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: AddressProps,
    id?: UniqueEntityId
  ): Either<AddressInvalidError, Address> {
    const schema: Schema<AddressProps> = {
      country: validator.object({
        value: validator.string(),
      }),
      address: validator.string(),
      latLng: validator.object({
        lat: validator.string(),
        lng: validator.string(),
      }),
    };

    const validate = validator.validate(schema, props);

    if (validate.success) {
      return Result.ok(new Address(props, id));
    }

    return Result.fail(AddressInvalidError.create(validate.message as string));
  }
}
