import { ValueObject } from "@micro/kernel/lib/domain/value-object";

export interface IsoProps {
  value: string;
}

export class Iso extends ValueObject<IsoProps> {
  public static ISO_PATTERN = /^[A-Z]{2}$/;

  get value(): string {
    return this.props.value;
  }

  constructor(props: IsoProps) {
    super(props);
  }
}
