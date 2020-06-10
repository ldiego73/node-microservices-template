import {
  ListCountryUseCase,
  listCountryUseCase,
} from "@micro/countries-core/lib/application/use-cases";
import { BaseService } from "@micro/server";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListService extends BaseService {
  private readonly useCase: ListCountryUseCase;

  constructor() {
    super();
    this.useCase = listCountryUseCase;
  }

  async execute(): Promise<any> {
    const result = await this.useCase.execute();
    return result.value;
  }
}
