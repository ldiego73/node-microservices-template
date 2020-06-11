import { ValueObject } from "@micro/kernel/lib/domain/value-object";

export interface CountryProps {
  value: string;
}

export class Country extends ValueObject<CountryProps> {
  public static COUNTRY_PATTERN = /^[A-Z]{2}$/;

  get value(): string {
    return this.props.value;
  }

  constructor(props: CountryProps) {
    super(props);
  }
}
