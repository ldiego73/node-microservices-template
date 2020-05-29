import { Result, Either } from '@micro/kernel/lib/result';
import { ValueObject } from '@micro/kernel/lib/domain/value-object';
import * as validator from '@micro/utils';
import { CountryInvalidError } from './errors';

interface CountryProps {
  value: string;
}

export class Country extends ValueObject<CountryProps> {
  public static COUNTRY_PATTERN = /^[A-Z]{2}$/;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: CountryProps) {
    super(props);
  }

  public static create(country: string): Either<CountryInvalidError, Country> {
    const validate = validator.pattern(this.COUNTRY_PATTERN)(country);

    if (validate.success) {
      return Result.ok(new Country({ value: country }));
    }

    return Result.fail(CountryInvalidError.create(country));
  }
}
