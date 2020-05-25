import { Controller, Get } from '@nestjs/common';
import { ListService } from './list.service';

@Controller()
export class ListController {
  constructor(private readonly service: ListService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.service.execute();
  }
}
