import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '@micro/server';
import { IsoInvalidError } from '@micro/countries-core/lib/domain/errors';
import { CountryNotExistsError } from '@micro/countries-core/lib/application/use-cases';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { UpdateService } from './update.service';
import { CountrySchemaInput } from '../../models';

@Resolver()
export class UpdateResolver extends BaseResolver {
  constructor(private readonly service: UpdateService) {
    super();
  }

  @Mutation(returns => Boolean)
  async update(@Args('input') input: CountrySchemaInput) {
    try {
      return await this.service.execute(input);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryNotExistsError:
          this.notFound(err.message, err.code);
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
