import { Module } from '@nestjs/common';
import { CreateController } from './create.controller';
import { CreateService } from './create.service';

@Module({
  controllers: [CreateController],
  providers: [CreateService],
})
export class CreateModule {}
