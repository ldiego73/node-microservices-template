import { CountryNotExistsError } from "@micro/countries-core/lib/application/use-cases";
import { IsoInvalidError } from "@micro/countries-core/lib/domain/errors";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseResolver } from "@micro/server";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CountrySchemaInput } from "../../models";
import { UpdateService } from "./update.service";

@Resolver()
export class UpdateResolver extends BaseResolver {
  constructor(private readonly service: UpdateService) {
    super();
  }

  // eslint-disable-next-line
  @Mutation((returns) => Boolean)
  async update(@Args("input") input: CountrySchemaInput): Promise<void> {
    try {
      return await this.service.execute(input);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case CountryNotExistsError:
          return this.notFound(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
