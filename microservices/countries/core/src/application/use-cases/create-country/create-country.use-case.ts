import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { Country, CountryRepository } from "../../../domain";
import { CountryInvalidError, IsoInvalidError } from "../../../domain/errors";
import { CountryFactory, IsoFactory } from "../../../domain/factory";
import { CountryDto } from "../../dtos";
import { CountryAlreadyExistsError } from "./create-country.error";

type Response<T> = Either<
  | IsoInvalidError
  | CountryInvalidError
  | CountryAlreadyExistsError
  | UseCaseUnexpectedError,
  T
>;

export class CreateCountryUseCase
  implements UseCase<CountryDto, Response<any>> {
  constructor(private repository: CountryRepository) {}

  async execute(request: CountryDto): Promise<Response<any>> {
    const isoOrError = IsoFactory.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.error);
    }

    const iso = isoOrError.value;

    const countryOrError = CountryFactory.create({
      name: request.name,
      iso,
      currency: request.currency,
      status: request.status,
    });

    if (countryOrError.isFailure()) {
      return Result.fail(countryOrError.error);
    }

    const country: Country = countryOrError.value;
    const countryAlreadyExists = await this.repository.exists(iso.value);

    if (countryAlreadyExists) {
      return Result.fail(CountryAlreadyExistsError.create(iso.value, null));
    }

    try {
      await this.repository.create(country);
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }

    return Result.ok();
  }
}
