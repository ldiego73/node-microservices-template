/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { CountryRepository } from "../../../domain";
import { CountryDto, IsoDto } from "../../dtos";
import { CountryMapper } from "../../mappers";

type Response<T> = Either<UseCaseUnexpectedError, T>;

export class ListCountryUseCase
  implements UseCase<IsoDto, Response<CountryDto[]>> {
  constructor(
    private repository: CountryRepository,
    private mapper: CountryMapper
  ) {}

  async execute(): Promise<Response<CountryDto[]>> {
    try {
      const countries = await this.repository.findAll();
      return Result.ok(this.mapper.toCollection(countries));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
