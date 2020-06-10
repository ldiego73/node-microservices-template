import { Module } from "@nestjs/common";

import { DeleteResolver } from "./delete.resolver";
import { DeleteService } from "./delete.service";

@Module({
  providers: [DeleteResolver, DeleteService],
})
export class DeleteModule {}
