import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateService } from './update.service';
import { CountryInput } from '../../models';

@Resolver()
export class UpdateResolver {
  constructor(private readonly service: UpdateService) {}

  @Mutation(returns => Boolean)
  async update(@Args('input') input: CountryInput) {
    return await this.service.execute(input);
  }
}
