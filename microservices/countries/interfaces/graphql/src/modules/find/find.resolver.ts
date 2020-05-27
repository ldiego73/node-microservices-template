import { Args, Query, Resolver } from '@nestjs/graphql';
import { CountrySchema } from '../../models/country.model';
import { BaseResolver } from '@micro/server';
import { IsoInvalidError } from '@micro/countries-core/lib/domain';
import { CountryNotFoundError } from '@micro/countries-core/lib/application/use-cases';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { FindService } from './find.service';
@Resolver()
export class FindResolver extends BaseResolver {
  constructor(private readonly service: FindService) {
    super();
  }

  // eslint-disable-next-line
  @Query((returns) => CountrySchema)
  async country(@Args('iso') iso: string): Promise<void> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
        case CountryNotFoundError:
          this.notFound(err.message, err.code);
        case UseCaseUnexpectedError:
          this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
