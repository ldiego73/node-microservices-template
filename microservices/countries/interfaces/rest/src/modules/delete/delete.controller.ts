import { IsoInvalidError } from "@micro/countries-core/lib/domain";
import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseController } from "@micro/server";
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from "@nestjs/common";

import { DeleteService } from "./delete.service";

@Controller()
export class DeleteController extends BaseController {
  constructor(private readonly service: DeleteService) {
    super();
  }

  @Delete(":iso")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param("iso") iso: string): Promise<any> {
    try {
      return await this.service.execute(iso);
    } catch (err) {
      switch (err.constructor) {
        case IsoInvalidError:
          return this.bad(err.message, err.code);
        case UseCaseUnexpectedError:
          return this.fail(err.message, err.code);
        default:
          throw err;
      }
    }
  }
}
