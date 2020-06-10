import { Module } from "@nestjs/common";

import { FindController } from "./find.controller";
import { FindService } from "./find.service";

@Module({
  controllers: [FindController],
  providers: [FindService],
})
export class FindModule {}
