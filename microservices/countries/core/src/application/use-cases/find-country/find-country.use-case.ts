import {
  UseCase,
  UseCaseUnexpectedError,
  Transform,
} from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Country } from '../../../domain';
import { IsoInvalidError } from '../../../domain/errors';
import { IsoDto, CountryDto } from '../../dtos';
import { CountryTransform } from '../../transforms';
import { CountryNotFoundError } from './country-not-found.error';
import { IsoFactory } from '../../../domain/factory';

type Response = Either<
  IsoInvalidError | CountryNotFoundError | UseCaseUnexpectedError,
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
    const isoOrError = IsoFactory.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(IsoInvalidError.create(request.iso));
    }

    const iso = isoOrError.value;

    try {
      const country = await this.repository.findByIso(iso.value);

      if (iso.value !== country.iso) {
        return Result.fail(CountryNotFoundError.create(iso.value));
      }

      return Result.ok(this.transform.toDto(country));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
