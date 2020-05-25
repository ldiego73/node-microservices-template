import { Entity, UniqueEntityId } from '@micro/kernel/lib/domain';
import { Result, Either } from '@micro/kernel/lib/result';
import { Schema } from '@micro/utils';
import * as validator from '@micro/utils';
import { Iso } from './iso';
import { CountryInvalidError } from './errors';

interface CountryProps {
  name: string;
  iso: Iso;
  currency: string;
  status: boolean;
}

export class Country extends Entity<CountryProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get iso(): string {
    return this.props.iso.value;
  }

  get currency(): string {
    return this.props.currency;
  }

  get status(): boolean {
    return this.props.status;
  }

  private constructor(props: CountryProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: CountryProps,
    id?: UniqueEntityId
  ): Either<CountryInvalidError, Country> {
    const schema: Schema<CountryProps> = {
      name: validator.string(),
      iso: validator.object({
        value: validator.string(),
      }),
      currency: validator.string(),
      status: validator.boolean(),
    };

    const validate = validator.validate(schema, props);

    if (validate.success) {
      return Result.ok(new Country(props, id));
    }

    return Result.fail(CountryInvalidError.create(validate.message as string));
  }
}
