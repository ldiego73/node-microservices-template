import { Result, Either } from '@micro/kernel/lib/result';
import { UniqueEntityId } from '@micro/kernel/lib/domain';
import * as validator from '@micro/utils';
import { Schema } from '@micro/utils';
import { CountryInvalidError } from '../errors';
import { Country, CountryProps } from '../country';

export class CountryFactory {
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

  public static createFrom(props: CountryProps, id?: UniqueEntityId): Country {
    return new Country(props, id);
  }
}
