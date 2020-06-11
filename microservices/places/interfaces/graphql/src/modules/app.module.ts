import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import path from "path";

import { GeocodeModule } from "./geocode/geocode.module";
import { SearchModule } from "./search/search.module";

const modules = [GeocodeModule, SearchModule];

@Module({
  imports: [
    ...modules,
    GraphQLModule.forRoot({
      autoSchemaFile: path.join(process.cwd(), "src/schema.gql"),
    }),
  ],
})
export class AppModule {}
