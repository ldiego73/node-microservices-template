import { UseCase, UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { Either, Result } from "@micro/kernel/lib/result";

import { AddressRepository } from "../../../domain";
import { AddressDto, LocationDto } from "../../dtos";
import { AddressMapper } from "../../mappers/address.mapper";

type Response<T> = Either<UseCaseUnexpectedError, T>;

export class GeocodeAddressUseCase
  implements UseCase<LocationDto, Response<AddressDto[]>> {
  constructor(
    private repository: AddressRepository,
    private mapper: AddressMapper
  ) {}

  async execute(request: LocationDto): Promise<Response<AddressDto[]>> {
    try {
      const addresses = await this.repository.geocode(request.lat, request.lng);
      return Result.ok(this.mapper.toCollection(addresses));
    } catch (err) {
      return Result.fail(UseCaseUnexpectedError.create(err));
    }
  }
}
