import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { CountryInvalidError } from "@micro/places-core/lib/domain";
import { BaseController } from "@micro/server";
import { Controller, Get, Query } from "@nestjs/common";

import { SearchDto } from "../dtos";
import { SearchService } from "./search.service";

@Controller()
export class SearchController extends BaseController {
  constructor(private readonly service: SearchService) {
    super();
  }

  @Get("/search")
  async search(@Query() search: SearchDto): Promise<any> {
    try {
      return await this.service.execute(search.country, search.address);
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
