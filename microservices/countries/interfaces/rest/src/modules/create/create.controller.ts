import { CountryDto } from "@micro/countries-core/lib/application/dtos";
import { CountryAlreadyExistsError } from "@micro/countries-core/lib/application/use-cases";
import {
  CountryInvalidError,
  IsoInvalidError,
} from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseController } from "@micro/server";
import { Body, Controller, HttpCode, HttpStatus,Post } from "@nestjs/common";

import { CreateService } from "./create.service";

@Controller()
export class CreateController extends BaseController {
  constructor(private readonly service: CreateService) {
    super();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async findAll(@Body() country: CountryDto): Promise<any> {
    try {
      return await this.service.execute(country);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryAlreadyExistsError:
          this.conflict(err.message, err.code);
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
