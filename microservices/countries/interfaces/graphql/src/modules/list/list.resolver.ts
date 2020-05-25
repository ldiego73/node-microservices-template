import { Query, Resolver } from '@nestjs/graphql';
import { CountrySchema } from '../../models/country.model';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
  constructor(private readonly service: ListService) {}

  @Query(returns => [CountrySchema])
  async countries() {
    return await this.service.execute();
  }
}
