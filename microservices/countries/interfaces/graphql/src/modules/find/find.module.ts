import { Module } from "@nestjs/common";

import { FindResolver } from "./find.resolver";
import { FindService } from "./find.service";

@Module({
  providers: [FindResolver, FindService],
})
export class FindModule {}
