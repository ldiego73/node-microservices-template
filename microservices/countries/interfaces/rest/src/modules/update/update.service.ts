import { Injectable } from '@nestjs/common';
import {
  UpdateCountryUseCase,
  updateCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';

@Injectable()
export class UpdateService {
  private readonly useCase: UpdateCountryUseCase;

  constructor() {
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
