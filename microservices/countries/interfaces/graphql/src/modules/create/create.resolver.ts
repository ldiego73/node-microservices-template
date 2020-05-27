import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '@micro/server';
import {
  IsoInvalidError,
  CountryInvalidError,
} from '@micro/countries-core/lib/domain';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { CountryAlreadyExistsError } from '@micro/countries-core/lib/application/use-cases';
import { CreateService } from './create.service';
import { CountrySchemaInput } from '../../models';

@Resolver()
export class CreateResolver extends BaseResolver {
  constructor(private readonly service: CreateService) {
    super();
  }

  @Mutation(returns => Boolean)
  async create(@Args('input') input: CountrySchemaInput) {
    try {
      return await this.service.execute(input);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryAlreadyExistsError:
          this.conflict(err.message, err.code);
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
