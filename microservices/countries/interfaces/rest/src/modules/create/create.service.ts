import { CountryDto } from "@micro/countries-core/lib/application/dtos";
import {
  CreateCountryUseCase,
  createCountryUseCase,
} from "@micro/countries-core/lib/application/use-cases";
import { BaseService } from "@micro/server";
import { Injectable } from "@nestjs/common";

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
