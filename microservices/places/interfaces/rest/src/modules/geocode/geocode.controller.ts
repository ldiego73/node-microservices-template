import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { CountryInvalidError } from "@micro/places-core/lib/domain";
import { BaseController } from "@micro/server";
import { Controller, Get, Query } from "@nestjs/common";

import { LocationDto } from "../dtos";
import { GeocodeService } from "./geocode.service";

@Controller()
export class GeocodeController extends BaseController {
  constructor(private readonly service: GeocodeService) {
    super();
  }

  @Get("/geocode")
  async geocode(@Query() location: LocationDto): Promise<any> {
    try {
      return await this.service.execute(location.lat, location.lng);
    } catch (err) {
      switch (err.constructor) {
        case CountryInvalidError:
          return this.bad(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
