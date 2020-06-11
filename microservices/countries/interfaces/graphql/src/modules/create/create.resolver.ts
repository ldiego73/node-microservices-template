import { CountryAlreadyExistsError } from "@micro/countries-core/lib/application/use-cases";
import {
  CountryInvalidError,
  IsoInvalidError,
} from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseResolver } from "@micro/server";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CountrySchemaInput } from "../../models";
import { CreateService } from "./create.service";

@Resolver()
export class CreateResolver extends BaseResolver {
  constructor(private readonly service: CreateService) {
    super();
  }

  // eslint-disable-next-line
  @Mutation((returns) => Boolean)
  async create(@Args("input") input: CountrySchemaInput): Promise<void> {
    try {
      return await this.service.execute(input);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case CountryInvalidError:
          return this.bad(err.message, err.code);
        case CountryAlreadyExistsError:
          return this.conflict(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
