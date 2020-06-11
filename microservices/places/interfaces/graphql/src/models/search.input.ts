import { Field, InputType } from "@nestjs/graphql";

@InputType("SearchInput")
export class SearchSchemaInput {
  @Field()
  country!: string;

  @Field()
  address!: string;
}
