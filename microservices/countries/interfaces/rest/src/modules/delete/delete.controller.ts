import { DeleteCountryUseCase } from '@micro/countries-core/lib/application/use-cases';
import { IsoDto } from '@micro/countries-core/lib/application/dtos';
import { BaseController } from '../../core/base.controller';
import { IsoInvalidError } from '@micro/countries-core/lib/domain';

export class DeleteController extends BaseController {
  private useCase: DeleteCountryUseCase;

  constructor(useCase: DeleteCountryUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<any> {
    const iso = this.req.params.iso;
    const dto: IsoDto = { iso };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const { error } = result;
        switch (error.constructor) {
          case IsoInvalidError:
            return this.bad(error.message);
          default:
            return this.unprocessableEntity(error.message);
        }
      }

      return this.noContent();
    } catch (err) {
      return this.fail(err);
    }
  }
}
