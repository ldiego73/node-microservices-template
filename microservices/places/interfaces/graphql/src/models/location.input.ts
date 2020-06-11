import { Field, InputType } from "@nestjs/graphql";

@InputType("LocationInput")
export class LocationSchemaInput {
  @Field()
  lat!: string;

  @Field()
  lng!: string;
}
