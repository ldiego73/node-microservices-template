import { Result, Either } from '@micro/kernel/lib/result';
import { ValueObject } from '@micro/kernel/lib/domain/value-object';
import * as validator from '@micro/utils';
import { IsoInvalidError } from './errors';

interface IsoProps {
  value: string;
}

export class Iso extends ValueObject<IsoProps> {
  public static ISO_PATTERN = /^[A-Z]{2}$/;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: IsoProps) {
    super(props);
  }

  public static create(iso: string): Either<IsoInvalidError, Iso> {
    const validate = validator.pattern(this.ISO_PATTERN)(iso);

    if (validate.success) {
      return Result.ok(new Iso({ value: iso }));
    }

    return Result.fail(IsoInvalidError.create(iso));
  }
}
