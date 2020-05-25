import { Query, Resolver } from '@nestjs/graphql';
import { Country } from '../../models/country.model';
import { ListService } from './list.service';

@Resolver()
export class ListResolver {
  constructor(private readonly service: ListService) {}

  @Query(returns => [Country])
  async countries() {
    return await this.service.execute();
  }
}
