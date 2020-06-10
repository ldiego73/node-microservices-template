import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { Country, CountryRepository } from "../../../domain";
import { IsoInvalidError } from "../../../domain/errors";
import { CountryFactory, IsoFactory } from "../../../domain/factory";
import { CountryDto } from "../../dtos";
import { CountryNotExistsError } from "./update-country.error";

type Response<T> = Either<
  IsoInvalidError | CountryNotExistsError | UseCaseUnexpectedError,
  T
>;

export class UpdateCountryUseCase
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

    if (!countryAlreadyExists) {
      return Result.fail(CountryNotExistsError.create(iso.value, null));
    }

    try {
      await this.repository.update(country);
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }

    return Result.ok();
  }
}
