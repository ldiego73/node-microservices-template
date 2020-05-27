import { Controller, Put, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { BaseController } from '@micro/server';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';
import { IsoInvalidError } from '@micro/countries-core/lib/domain/errors';
import { CountryNotExistsError } from '@micro/countries-core/lib/application/use-cases';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { UpdateService } from './update.service';

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
