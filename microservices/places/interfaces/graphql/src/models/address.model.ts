import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("Location")
export class LocationSchema {
  @Field({ nullable: true })
  lat?: string;

  @Field({ nullable: true })
  lng?: string;
}

@ObjectType("Address")
export class AddressSchema {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => LocationSchema, { nullable: true })
  latLng?: LocationSchema;
}
