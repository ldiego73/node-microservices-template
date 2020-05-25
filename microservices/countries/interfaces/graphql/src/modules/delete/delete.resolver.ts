import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DeleteService } from './delete.service';

@Resolver()
export class DeleteResolver {
  constructor(private readonly service: DeleteService) {}

  @Mutation(returns => Boolean)
  async delete(@Args('iso') iso: string) {
    return await this.service.execute(iso);
  }
}
