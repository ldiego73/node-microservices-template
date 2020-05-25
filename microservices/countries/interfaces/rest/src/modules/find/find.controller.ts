import { Controller, Get, Param } from '@nestjs/common';
import { FindService } from './find.service';

@Controller()
export class FindController {
  constructor(private readonly service: FindService) {}

  @Get(':iso')
  async findByIso(@Param('iso') iso: string): Promise<any> {
    return await this.service.execute(iso);
  }
}
