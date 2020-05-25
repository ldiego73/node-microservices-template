import { Injectable } from '@nestjs/common';
import {
  CreateCountryUseCase,
  createCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';

@Injectable()
export class CreateService {
  private readonly useCase: CreateCountryUseCase;

  constructor() {
    this.useCase = createCountryUseCase;
  }

  async execute(country: CountryDto): Promise<any> {
    const result = await this.useCase.execute(country);

    if (result.isFailure()) {
      throw result.error.message;
    }

    return true;
  }
}
