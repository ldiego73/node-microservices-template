import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { CountryInvalidError } from "@micro/places-core/lib/domain";
import { BaseResolver } from "@micro/server";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { AddressSchema } from "../../models/address.model";
import { LocationSchemaInput } from "../../models/location.input";
import { GeocodeService } from "./geocode.service";

@Resolver()
export class GeocodeResolver extends BaseResolver {
  constructor(private readonly service: GeocodeService) {
    super();
  }

  // eslint-disable-next-line
  @Query((returns) => [AddressSchema])
  async geocode(@Args("input") input: LocationSchemaInput): Promise<void> {
    try {
      return await this.service.execute(input.lat, input.lng);
    } catch (err) {
      switch (err.constructor) {
        case CountryInvalidError:
          return this.bad(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
