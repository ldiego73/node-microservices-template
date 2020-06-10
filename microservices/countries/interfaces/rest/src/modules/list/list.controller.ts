import { UseCaseUnexpectedError } from "@micro/kernel/lib/application";
import { BaseController } from "@micro/server";
import { Controller, Get } from "@nestjs/common";

import { ListService } from "./list.service";

@Controller()
export class ListController extends BaseController {
  constructor(private readonly service: ListService) {
    super();
  }

  @Get()
  async findAll(): Promise<any> {
    try {
      return await this.service.execute();
    } catch (err) {
      switch (err.constructor) {
        case UseCaseUnexpectedError:
          this.fail(err.message, err.code);
          break;
        default:
          throw err;
      }
    }
  }
}
