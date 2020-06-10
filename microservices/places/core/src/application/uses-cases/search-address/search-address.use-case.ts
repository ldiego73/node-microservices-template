import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { AddressRepository } from "../../../domain";
import { AddressDto, SearchDto } from "../../dtos";

type Response<T> = Either<UseCaseUnexpectedError, T>;

export class SearchAddress
  implements UseCase<SearchDto, Response<AddressDto[]>> {
  private repository: AddressRepository;

  constructor(repository: AddressRepository) {
    this.repository = repository;
  }

  async execute(request: SearchDto): Promise<Response<AddressDto[]>> {
    try {
      const addresses = await this.repository.search(
        request.country,
        request.address
      );
      return Result.ok([]);
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
