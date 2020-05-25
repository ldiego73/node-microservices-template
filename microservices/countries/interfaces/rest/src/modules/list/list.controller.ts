import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { ListCountryUseCase } from '@micro/countries-core/lib/application/use-cases';
import { BaseController } from '../../core/base.controller';

export class ListController extends BaseController {
  private useCase: ListCountryUseCase;

  constructor(useCase: ListCountryUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<any> {
    try {
      const result = await this.useCase.execute();

      this.ok(result.value);
    } catch (err) {
      this.fail(err);
    }
  }
}
