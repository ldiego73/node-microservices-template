import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Country')
export class CountrySchema {
  @Field()
  name!: string;

  @Field()
  iso!: string;

  @Field()
  currency!: string;

  @Field()
  status!: boolean;
}
