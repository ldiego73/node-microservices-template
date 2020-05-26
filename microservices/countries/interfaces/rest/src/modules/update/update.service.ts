import { Injectable } from '@nestjs/common';
import {
  UpdateCountryUseCase,
  updateCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { BaseService } from '@micro/server';

@Injectable()
export class UpdateService extends BaseService{
  private readonly useCase: UpdateCountryUseCase;

  constructor() {
    super();
    this.useCase = updateCountryUseCase;
  }

  async execute(country: CountryDto): Promise<any> {
    const result = await this.useCase.execute(country);

    if (result.isFailure()) {
      throw result.error.message;
    }

    return true;
  }
}
