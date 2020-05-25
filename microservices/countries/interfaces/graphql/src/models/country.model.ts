import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Country {
  @Field()
  name!: string;

  @Field()
  iso!: string;

  @Field()
  currency!: string;

  @Field()
  status!: boolean;
}
