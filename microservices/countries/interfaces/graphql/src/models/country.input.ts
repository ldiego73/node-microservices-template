import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CountryInput {
  @Field()
  name!: string;

  @Field()
  iso!: string;

  @Field()
  currency!: string;

  @Field()
  status!: boolean;
}
