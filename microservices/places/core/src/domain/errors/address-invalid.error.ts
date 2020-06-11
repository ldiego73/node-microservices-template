import { DomainError } from "@micro/kernel/lib/domain";

export class AddressInvalidError extends DomainError {
  public constructor(field: string) {
    super("ADDRESS_INVALID", `The address is invalid => ${field}`);
  }

  public static create(field: string): AddressInvalidError {
    return new AddressInvalidError(field);
  }
}
