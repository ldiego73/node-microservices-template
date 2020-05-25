import { Injectable } from '@nestjs/common';
import {
  DeleteCountryUseCase,
  deleteCountryUseCase,
} from '@micro/countries-core/lib/application/use-cases';
import { IsoDto } from '@micro/countries-core/lib/application/dtos';

@Injectable()
export class DeleteService {
  private readonly useCase: DeleteCountryUseCase;

  constructor() {
    this.useCase = deleteCountryUseCase;
  }

  async execute(iso: string): Promise<any> {
    const dto: IsoDto = { iso };
    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      throw result.error.message;
    }

    return true;
  }
}
