import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { AddressRepository } from "../../../domain";
import { AddressDto, SearchDto } from "../../dtos";
import { AddressMapper } from "../../mappers/address.mapper";

type Response<T> = Either<UseCaseUnexpectedError, T>;

export class SearchAddressUseCase
  implements UseCase<SearchDto, Response<AddressDto[]>> {
  constructor(
    private repository: AddressRepository,
    private mapper: AddressMapper
  ) {}

  async execute(request: SearchDto): Promise<Response<AddressDto[]>> {
    try {
      const addresses = await this.repository.search(
        request.country,
        request.address
      );
      return Result.ok(this.mapper.toCollection(addresses));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
