import { Module } from "@nestjs/common";

import { CreateModule } from "./create/create.module";
import { DeleteModule } from "./delete/delete.module";
import { FindModule } from "./find/find.module";
import { ListModule } from "./list/list.module";
import { UpdateModule } from "./update/update.module";

const modules = [
  ListModule,
  FindModule,
  CreateModule,
  DeleteModule,
  UpdateModule,
];

@Module({
  imports: [...modules],
})
export class AppModule {}
