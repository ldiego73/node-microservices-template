import { BaseController } from '../../core/base.controller';
import { CreateCountryUseCase, CountryAlreadyExistsError } from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { IsoInvalidError, CountryInvalidError } from '@micro/countries-core/lib/domain';

export class CreateController extends BaseController {
  private useCase: CreateCountryUseCase;

  constructor(useCase: CreateCountryUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<any> {
    const country = this.req.body as CountryDto;

    try {
      const result = await this.useCase.execute(country);

      if (result.isFailure()) {
        const { error } = result;
        switch (error.constructor) {
          case IsoInvalidError:
            return this.bad(error.message);
          case CountryInvalidError:
            return this.bad(error.message);
          case CountryAlreadyExistsError:
            return this.conflict(error.message);
          default:
            return this.unprocessableEntity(error.message);
        }
      }

      return this.created();
    } catch (err) {
      return this.fail(err);
    }
  }
}
