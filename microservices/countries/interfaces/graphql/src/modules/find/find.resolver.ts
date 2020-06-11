import { CountryNotFoundError } from "@micro/countries-core/lib/application/use-cases";
import { IsoInvalidError } from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseResolver } from "@micro/server";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { CountrySchema } from "../../models/country.model";
import { FindService } from "./find.service";
@Resolver()
export class FindResolver extends BaseResolver {
  constructor(private readonly service: FindService) {
    super();
  }

  // eslint-disable-next-line
  @Query((returns) => CountrySchema)
  async country(@Args("iso") iso: string): Promise<void> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case CountryNotFoundError:
          return this.notFound(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
