import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

import { FindCountryUseCase } from '@micro/countries-core/lib/application/use-cases';
import { CountryDto, IsoDto } from '@micro/countries-core/lib/application/dtos';
import { BaseController } from '../../core/base.controller';

export class FindController extends BaseController<CountryDto> {
  private useCase: FindCountryUseCase;

  constructor(useCase: FindCountryUseCase) {
    super();
    this.useCase = useCase;
  }

  async execute(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): Promise<CountryDto> {
    const iso = request.params.iso;
    this.logger.info('Finding country...');

    const dto: IsoDto = {
      iso,
    };

    const result = await this.useCase.execute(dto);

    this.logger.info('Found country!!!');

    return result.value;
  }
}
