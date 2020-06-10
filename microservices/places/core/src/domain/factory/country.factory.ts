import { Either, Result } from "@micro/kernel/lib/result";
import * as validator from "@micro/utils";

import { Country, CountryProps } from "../country";
import { CountryInvalidError } from "../errors";

export class CountryFactory {
  public static create(country: string): Either<CountryInvalidError, Country> {
    const validate = validator.pattern(Country.COUNTRY_PATTERN)(country);

    if (validate.success) {
      return Result.ok(new Country({ value: country }));
    }

    return Result.fail(CountryInvalidError.create(country));
  }

  public static createFrom(country: string): Country {
    const props: CountryProps = { value: country };

    return new Country(props);
  }
}
