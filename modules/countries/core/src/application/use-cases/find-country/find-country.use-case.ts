import {
  UseCase,
  UseCaseUnexpectedError,
  Transform,
} from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Iso, Country } from '@domain/index';
import { IsoInvalidError } from '@domain/errors/index';
import { IsoDto, CountryDto } from '@application/dtos/index';
import { CountryTransform } from '@application/transforms/index';

type Response<T> = Either<IsoInvalidError | UseCaseUnexpectedError, T>;

export class FindCountryUseCase
  implements UseCase<IsoDto, Response<CountryDto>> {
  private repository: CountryRepository;
  private transform: Transform<Country, CountryDto>;

  constructor(repository: CountryRepository) {
    this.repository = repository;
    this.transform = new CountryTransform();
  }

  async execute(request: IsoDto): Promise<Response<CountryDto>> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.value);
    }

    const iso = isoOrError.value;

    try {
      const country = await this.repository.findByIso(iso.value);
      return Result.ok(this.transform.toDto(country));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
