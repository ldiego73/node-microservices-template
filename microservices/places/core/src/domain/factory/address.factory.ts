import { UniqueEntityId } from "@micro/kernel/lib/domain";
import { Either, Result } from "@micro/kernel/lib/result";
import { Schema } from "@micro/utils";
import * as validator from "@micro/utils";

import { Address, AddressProps } from "../address";
import { AddressInvalidError } from "../errors";

export class AddressFactory {
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

  public static createFrom(props: AddressProps, id?: UniqueEntityId): Address {
    return new Address(props, id);
  }
}
