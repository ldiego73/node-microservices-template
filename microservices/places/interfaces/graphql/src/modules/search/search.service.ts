import { SearchDto } from "@micro/places-core/lib/application/dtos";
import {
  SearchAddressUseCase,
  searchAddressUseCase,
} from "@micro/places-core/lib/application/use-cases";
import { BaseService } from "@micro/server";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService extends BaseService {
  private readonly useCase: SearchAddressUseCase;

  constructor() {
    super();
    this.useCase = searchAddressUseCase;
  }

  async execute(country: string, address: string): Promise<any> {
    const dto: SearchDto = { country, address };
    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      throw result.error;
    }

    return result.value;
  }
}
