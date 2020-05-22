import { UseCase, UseCaseUnexpectedError, Transform } from '@micro/kernel/lib/application';
import { Either, Result } from '@micro/kernel/lib/result';
import { CountryRepository, Country } from '@domain/index';
import { IsoInvalidError, CountryInvalidError } from '@domain/errors/index';
import { IsoDto, CountryDto } from '@application/dtos/index';
import { CountryTransform } from '@application/transforms/index';

type Response<T> = Either<IsoInvalidError | CountryInvalidError, T>;

export class ListCountryUseCase
  implements UseCase<IsoDto, Response<CountryDto[]>> {
  private repository: CountryRepository;
  private transform: Transform<Country, CountryDto>;

  constructor(repository: CountryRepository) {
    this.repository = repository;
    this.transform = new CountryTransform();
  }

  async execute(): Promise<Response<CountryDto[]>> {
    try {
      const countries = await this.repository.findAll();
      return Result.ok(this.transform.toCollection!(countries));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
