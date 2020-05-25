import { Args, Query, Resolver } from '@nestjs/graphql';
import { Country } from '../../models/country.model';
import { FindService } from './find.service';

@Resolver()
export class FindResolver {
  constructor(private readonly service: FindService) {}

  @Query(returns => Country)
  async country(@Args('iso') iso: string) {
    return await this.service.execute(iso);
  }
}
