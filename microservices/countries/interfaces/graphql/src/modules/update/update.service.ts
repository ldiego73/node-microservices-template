import { Injectable } from '@nestjs/common';
import {
  UpdateCountryUseCase,
  updateCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { CountrySchemaInput } from '../../models';

@Injectable()
export class UpdateService {
  private readonly useCase: UpdateCountryUseCase;

  constructor() {
    this.useCase = updateCountryUseCase;
  }

  async execute(country: CountrySchemaInput): Promise<any> {;
    const dto = country as CountryDto;
    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      throw result.error.message;
    }

    return true;
  }
}
