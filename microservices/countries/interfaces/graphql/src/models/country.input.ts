import { Field, InputType } from "@nestjs/graphql";

@InputType("CountryInput")
export class CountrySchemaInput {
  @Field()
  name!: string;

  @Field()
  iso!: string;

  @Field()
  currency!: string;

  @Field()
  status!: boolean;
}
