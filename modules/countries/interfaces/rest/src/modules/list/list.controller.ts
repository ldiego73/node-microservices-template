import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { ListCountryUseCase } from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { BaseController } from '../../core/base.controller';

export class ListController extends BaseController<CountryDto[]> {
  private useCase: ListCountryUseCase;

  constructor(useCase: ListCountryUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): Promise<CountryDto[]> {
    this.logger.info('Listing countries...');

    const result = await this.useCase.execute();

    this.logger.info('Listed countries!!!');

    return result.value;
  }
}
