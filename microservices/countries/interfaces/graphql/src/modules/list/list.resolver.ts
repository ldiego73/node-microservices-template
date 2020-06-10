import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseResolver } from "@micro/server";
import { Query, Resolver } from "@nestjs/graphql";

import { CountrySchema } from "../../models/country.model";
import { ListService } from "./list.service";

@Resolver()
export class ListResolver extends BaseResolver {
  constructor(private readonly service: ListService) {
    super();
  }

  // eslint-disable-next-line
  @Query((returns) => [CountrySchema])
  async countries(): Promise<void> {
    try {
      return await this.service.execute();
    } catch (err) {
      if (err.constructor === UseCaseUnexpectedError) {
        this.fail(err.message, err.code);
      } else {
        throw err;
      }
    }
  }
}
