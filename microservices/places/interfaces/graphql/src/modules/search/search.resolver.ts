import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { CountryInvalidError } from "@micro/places-core/lib/domain";
import { BaseResolver } from "@micro/server";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { AddressSchema } from "../../models/address.model";
import { SearchSchemaInput } from "../../models/search.input";
import { SearchService } from "./search.service";

@Resolver()
export class SearchResolver extends BaseResolver {
  constructor(private readonly service: SearchService) {
    super();
  }

  // eslint-disable-next-line
  @Query((returns) => [AddressSchema])
  async search(@Args("input") input: SearchSchemaInput): Promise<void> {
    try {
      return await this.service.execute(input.country, input.address);
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
