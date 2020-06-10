import { Either, Result } from "@micro/kernel/lib/result";
import * as validator from "@micro/utils";

import { IsoInvalidError } from "../errors";
import { Iso, IsoProps } from "../iso";

export class IsoFactory {
  public static create(iso: string): Either<IsoInvalidError, Iso> {
    const validate = validator.pattern(Iso.ISO_PATTERN)(iso);

    if (validate.success) {
      return Result.ok(new Iso({ value: iso }));
    }

    return Result.fail(IsoInvalidError.create(iso));
  }

  public static createFrom(iso: string): Iso {
    const props: IsoProps = { value: iso };

    return new Iso(props);
  }
}
