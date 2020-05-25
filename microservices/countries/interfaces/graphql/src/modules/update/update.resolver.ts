import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateService } from './update.service';
import { CountrySchemaInput } from '../../models';

@Resolver()
export class UpdateResolver {
  constructor(private readonly service: UpdateService) {}

  @Mutation(returns => Boolean)
  async update(@Args('input') input: CountrySchemaInput) {
    return await this.service.execute(input);
  }
}
