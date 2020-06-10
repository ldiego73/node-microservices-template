import { CountryDto } from "@micro/countries-core/lib/application/dtos";
import { CountryNotExistsError } from "@micro/countries-core/lib/application/use-cases";
import { IsoInvalidError } from "@micro/countries-core/lib/domain/errors";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseController } from "@micro/server";
import { Body, Controller, HttpCode, HttpStatus,Put } from "@nestjs/common";

import { UpdateService } from "./update.service";

@Controller()
export class UpdateController extends BaseController {
  constructor(private readonly service: UpdateService) {
    super();
  }

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() country: CountryDto): Promise<any> {
    try {
      return await this.service.execute(country);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryNotExistsError:
          this.notFound(err.message, err.code);
          break;
        case UseCaseUnexpectedError:
          this.fail(err.message, err.code);
          break;
        default:
          throw err;
      }
    }
  }
}
