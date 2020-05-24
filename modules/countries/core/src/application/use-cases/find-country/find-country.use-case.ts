import {
  UseCase,
  UseCaseUnexpectedError,
  Transform,
} from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Iso, Country } from '@domain/index';
import { IsoInvalidError } from '@domain/errors';
import { IsoDto, CountryDto } from '@application/dtos/index';
import { CountryTransform } from '@application/transforms/index';
import { FindCountryError } from './find-country.error';

type Response = Either<
  IsoInvalidError | FindCountryError | UseCaseUnexpectedError,
  CountryDto
>;

export class FindCountryUseCase implements UseCase<IsoDto, Response> {
  private repository: CountryRepository;
  private transform: Transform<Country, CountryDto>;

  constructor(repository: CountryRepository) {
    this.repository = repository;
    this.transform = new CountryTransform();
  }

  async execute(request: IsoDto): Promise<Response> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(IsoInvalidError.create(request.iso));
    }

    const iso = isoOrError.value;

    try {
      const country = await this.repository.findByIso(iso.value);

      if (iso.value !== country.iso) {
        return Result.fail(FindCountryError.create(iso.value));
      }

      return Result.ok(this.transform.toDto(country));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
