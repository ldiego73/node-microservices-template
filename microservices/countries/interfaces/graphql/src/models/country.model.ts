import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("Country")
export class CountrySchema {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  iso?: string;

  @Field({ nullable: true })
  currency?: string;

  @Field({ nullable: true })
  status?: boolean;
}
