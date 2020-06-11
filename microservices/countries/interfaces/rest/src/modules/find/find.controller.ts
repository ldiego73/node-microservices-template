import { CountryNotFoundError } from "@micro/countries-core/lib/application/use-cases";
import { IsoInvalidError } from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseController } from "@micro/server";
import { Controller, Get, Param } from "@nestjs/common";

import { FindService } from "./find.service";

@Controller()
export class FindController extends BaseController {
  constructor(private readonly service: FindService) {
    super();
  }

  @Get(":iso")
  async findByIso(@Param("iso") iso: string): Promise<any> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case CountryNotFoundError:
          return this.notFound(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
