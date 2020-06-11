import { IsoInvalidError } from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseResolver } from "@micro/server";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { DeleteService } from "./delete.service";

@Resolver()
export class DeleteResolver extends BaseResolver {
  constructor(private readonly service: DeleteService) {
    super();
  }

  // eslint-disable-next-line
  @Mutation((returns) => Boolean)
  async delete(@Args("iso") iso: string): Promise<void> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
