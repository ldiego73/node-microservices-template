import { Injectable } from '@nestjs/common';
import {
  CreateCountryUseCase,
  createCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { BaseService } from '@micro/server';

@Injectable()
export class CreateService extends BaseService {
  private readonly useCase: CreateCountryUseCase;

  constructor() {
    super();
    this.useCase = createCountryUseCase;
  }

  async execute(country: CountryDto): Promise<any> {
    const result = await this.useCase.execute(country);

    if (result.isFailure()) {
      throw result.error;
    }

    return true;
  }
}
