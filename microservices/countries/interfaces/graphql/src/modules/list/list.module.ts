import { Module } from "@nestjs/common";

import { ListResolver } from "./list.resolver";
import { ListService } from "./list.service";

@Module({
  providers: [ListResolver, ListService],
})
export class ListModule {}
