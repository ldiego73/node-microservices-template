import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { BaseController } from '@micro/server';
import { IsoInvalidError } from '@micro/countries-core/lib/domain';
import { CountryNotFoundError } from '@micro/countries-core/lib/application/use-cases';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { FindService } from './find.service';

@Controller()
export class FindController extends BaseController {
  constructor(private readonly service: FindService) {
    super();
  }

  @Get(':iso')
  async findByIso(@Param('iso') iso: string): Promise<any> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
          break;
        case CountryNotFoundError:
          this.notFound(err.message, err.code);
          break;
        case UseCaseUnexpectedError:
          this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
