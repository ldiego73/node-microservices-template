import { Module } from "@nestjs/common";

import { GeocodeModule } from "./geocode/geocode.module";
import { SearchModule } from "./search/search.module";

const modules = [GeocodeModule, SearchModule];

@Module({
  imports: [...modules],
})
export class AppModule {}
