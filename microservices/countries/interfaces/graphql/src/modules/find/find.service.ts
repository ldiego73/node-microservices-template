import { Injectable } from '@nestjs/common';
import {
  FindCountryUseCase,
  findCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { IsoDto } from '@micro/countries-core/lib/application/dtos';

@Injectable()
export class FindService {
  private readonly useCase: FindCountryUseCase;

  constructor() {
    this.useCase = findCountryUseCase;
  }

  async execute(iso: string): Promise<any> {
    const dto: IsoDto = { iso };
    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      throw result.error.message;
    }

    return result.value;
  }
}
