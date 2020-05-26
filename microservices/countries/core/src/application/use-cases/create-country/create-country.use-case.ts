import { UseCase, UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Iso, Country } from '../../../domain';
import { IsoInvalidError, CountryInvalidError } from '../../../domain/errors';
import { CountryDto } from '../../dtos';
import { CountryAlreadyExistsError } from './create-country.error';

type Response<T> = Either<
  IsoInvalidError | CountryInvalidError | UseCaseUnexpectedError,
  T
>;

export class CreateCountryUseCase
  implements UseCase<CountryDto, Response<any>> {
  private repository: CountryRepository;

  constructor(repository: CountryRepository) {
    this.repository = repository;
  }

  async execute(request: CountryDto): Promise<Response<any>> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.error);
    }

    const iso = isoOrError.value;

    const countryOrError = Country.create({
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
