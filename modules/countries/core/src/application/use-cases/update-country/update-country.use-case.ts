import { UseCase, UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Iso, Country } from '@domain/index';
import { IsoInvalidError, CountryInvalidError } from '@domain/errors';
import { CountryDto } from '@application/dtos';
import { CountryNotExistsError } from './update-country.error';

type Response<T> = Either<
  IsoInvalidError | CountryInvalidError | UseCaseUnexpectedError,
  T
>;

export class UpdateCountryUseCase
  implements UseCase<CountryDto, Response<any>> {
  private repository: CountryRepository;

  constructor(repository: CountryRepository) {
    this.repository = repository;
  }

  async execute(request: CountryDto): Promise<Response<any>> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.value);
    }

    const iso = isoOrError.value;

    const countryOrError = Country.create({
      name: request.name,
      iso,
      currency: request.currency,
      status: request.status,
    });

    if (countryOrError.isFailure()) {
      return Result.fail(countryOrError.value);
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
