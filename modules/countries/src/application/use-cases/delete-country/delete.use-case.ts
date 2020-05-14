import { UseCase, UseCaseUnexpectedError } from '@micro/kernel';
import { Either, Result } from '@micro/kernel';
import { CountryRepository, Iso } from '@domain/index';
import { IsoInvalidError } from '@domain/errors/index';
import { CountryRepositoryImpl } from '@infraestructure/repositories/index';
import { IsoDto } from '@application/dtos/index';

type Response<T> = Either<IsoInvalidError | UseCaseUnexpectedError, T>;

export class DeleteCountryUseCase implements UseCase<IsoDto, Response<any>> {
  private countryRepository: CountryRepository;

  constructor() {
    this.countryRepository = new CountryRepositoryImpl();
  }

  async execute(request: IsoDto): Promise<Response<any>> {
    const isoOrError = Iso.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.value);
    }

    const iso = isoOrError.value;

    try {
      await this.countryRepository.delete(iso.value);
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }

    return Result.ok();
  }
}
