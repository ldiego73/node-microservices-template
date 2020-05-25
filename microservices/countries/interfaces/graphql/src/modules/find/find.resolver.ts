import { Args, Query, Resolver } from '@nestjs/graphql';
import { CountrySchema } from '../../models/country.model';
import { FindService } from './find.service';

@Resolver()
export class FindResolver {
  constructor(private readonly service: FindService) {}

  @Query(returns => CountrySchema)
  async country(@Args('iso') iso: string) {
    return await this.service.execute(iso);
  }
}
