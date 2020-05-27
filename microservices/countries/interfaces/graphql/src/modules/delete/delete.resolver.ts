import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '@micro/server';
import { IsoInvalidError } from '@micro/countries-core/lib/domain';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { DeleteService } from './delete.service';

@Resolver()
export class DeleteResolver extends BaseResolver{
  constructor(private readonly service: DeleteService) {
    super();
  }

  @Mutation(returns => Boolean)
  async delete(@Args('iso') iso: string) {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case UseCaseUnexpectedError:
          this.fail(err.message, err.code);
          break;
        default:
          throw err;
      }
    }
  }
}
