import { Injectable } from '@nestjs/common';
import { ListCountryUseCase, listCountryUseCase } from '@micro/countries-core/lib/application/use-cases';

@Injectable()
export class ListService {
  private readonly useCase: ListCountryUseCase;

  constructor() {
    this.useCase = listCountryUseCase;
  }

  async execute(): Promise<any> {
    const result = await this.useCase.execute();
    return result.value;
  }
}
