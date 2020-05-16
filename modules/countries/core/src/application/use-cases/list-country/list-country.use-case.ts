import { UseCase, UseCaseUnexpectedError } from '@micro/kernel';
import { Either, Result } from '@micro/kernel';
import { CountryRepository, Country } from '@domain/index';
import { IsoInvalidError, CountryInvalidError } from '@domain/errors/index';
import { CountryRepositoryImpl } from '@infraestructure/repositories/index';
import { IsoDto, CountryDto } from '@application/dtos/index';
import { Transform } from '@micro/kernel/lib/application';
import { CountryTransform } from '@application/transforms/index';

type Response<T> = Either<IsoInvalidError | CountryInvalidError, T>;

export class ListCountryUseCase
  implements UseCase<IsoDto, Response<CountryDto[]>> {
  private countryRepository: CountryRepository;
  private countryTransform: Transform<Country, CountryDto>;

  constructor() {
    this.countryRepository = new CountryRepositoryImpl();
    this.countryTransform = new CountryTransform();
  }

  async execute(): Promise<Response<CountryDto[]>> {
    try {
      const countries = await this.countryRepository.findAll();
      return Result.ok(this.countryTransform.toColletion!(countries));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
