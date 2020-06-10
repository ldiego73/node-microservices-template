import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { CountryRepository } from "../../../domain";
import { IsoInvalidError } from "../../../domain/errors";
import { IsoFactory } from "../../../domain/factory";
import { IsoDto } from "../../dtos";

type Response<T> = Either<IsoInvalidError | UseCaseUnexpectedError, T>;

export class DeleteCountryUseCase implements UseCase<IsoDto, Response<any>> {
  constructor(private repository: CountryRepository) {}

  async execute(request: IsoDto): Promise<Response<any>> {
    const isoOrError = IsoFactory.create(request.iso);

    if (isoOrError.isFailure()) {
      return Result.fail(isoOrError.error);
    }

    const iso = isoOrError.value;

    try {
      await this.repository.delete(iso.value);
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }

    return Result.ok();
  }
}
