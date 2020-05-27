import {
  Controller,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BaseController } from '@micro/server';
import { IsoInvalidError } from '@micro/countries-core/lib/domain';
import { UseCaseUnexpectedError } from '@micro/kernel/lib/application';
import { DeleteService } from './delete.service';

@Controller()
export class DeleteController extends BaseController {
  constructor(private readonly service: DeleteService) {
    super();
  }

  @Delete(':iso')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('iso') iso: string): Promise<any> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          this.bad(err.message, err.code);
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
