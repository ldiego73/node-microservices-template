import { LocationDto } from "@micro/places-core/lib/application/dtos";
import {
  GeocodeAddressUseCase,
  geocodeAddressUseCase,
} from "@micro/places-core/lib/application/use-cases";
import { BaseService } from "@micro/server";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GeocodeService extends BaseService {
  private readonly useCase: GeocodeAddressUseCase;

  constructor() {
    super();
    this.useCase = geocodeAddressUseCase;
  }

  async execute(lat: string, lng: string): Promise<any> {
    const dto: LocationDto = { lat, lng };
    const result = await this.useCase.execute(dto);

    if (result.isFailure()) {
      throw result.error;
    }

    return result.value;
  }
}
