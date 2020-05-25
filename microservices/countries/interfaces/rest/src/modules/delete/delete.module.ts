import { Module } from '@nestjs/common';
import { DeleteController } from './delete.controller';
import { DeleteService } from './delete.service';

@Module({
  controllers: [DeleteController],
  providers: [DeleteService],
})
export class DeleteModule {}
