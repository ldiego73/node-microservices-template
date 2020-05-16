import { UseCase, UseCaseUnexpectedError } from '@micro/kernel';
import { Either, Result } from '@micro/kernel';
import { CountryRepository, Iso, Country } from '@domain/index';
import { IsoInvalidError } from '@domain/errors/index';
import { CountryRepositoryImpl } from '@infraestructure/repositories/index';
import { IsoDto, CountryDto } from '@application/dtos/index';
import { Transform } from '@micro/kernel/lib/application';
import { CountryTransform } from '@application/transforms/index';

type Response<T> = Either<IsoInvalidError | UseCaseUnexpectedError, T>;

export class FindCountryUseCase
  implements UseCase<IsoDto, Response<CountryDto>> {
  private countryRepository: CountryRepository;
  private countryTransform: Transform<Country, CountryDto>;

  constructor() {
    this.countryRepository = new CountryRepositoryImpl();
    this.countryTransform = new CountryTransform();
  }

  async execute(request: IsoDto): Promise<Response<CountryDto>> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.value);
    }

    const iso = isoOrError.value;

    try {
      const country = await this.countryRepository.findByIso(iso.value);
      return Result.ok(this.countryTransform.toDto(country));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
