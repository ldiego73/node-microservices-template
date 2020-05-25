import { Controller, Delete, Param } from '@nestjs/common';
import { DeleteService } from './delete.service';

@Controller()
export class DeleteController {
  constructor(private readonly service: DeleteService) {}

  @Delete(':iso')
  async deleteById(@Param('iso') iso: string): Promise<any> {
    return await this.service.execute(iso);
  }
}
