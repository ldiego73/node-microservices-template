import { Module } from "@nestjs/common";

import { CreateResolver } from "./create.resolver";
import { CreateService } from "./create.service";

@Module({
  providers: [CreateResolver, CreateService],
})
export class CreateModule {}
