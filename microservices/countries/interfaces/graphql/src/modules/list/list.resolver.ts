import { Query, Resolver } from '@nestjs/graphql';
import { CountrySchema } from '../../models/country.model';
import { BaseResolver } from '@micro/server';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { ListService } from './list.service';

@Resolver()
export class ListResolver extends BaseResolver {
  constructor(private readonly service: ListService) {
    super();
  }

  @Query(returns => [CountrySchema])
  async countries() {
    try {
      return await this.service.execute();
    } catch (err) {
      switch (err.constructor) {
        case UseCaseUnexpectedError:
          this.fail(err.message);
          break;
        default:
          throw err;
      }
    }
  }
}
