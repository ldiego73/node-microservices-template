import { Module } from "@nestjs/common";

import { UpdateResolver } from "./update.resolver";
import { UpdateService } from "./update.service";

@Module({
  providers: [UpdateResolver, UpdateService],
})
export class UpdateModule {}
