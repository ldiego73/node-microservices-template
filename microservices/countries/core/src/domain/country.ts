import { Entity, UniqueEntityId } from "@micro/kernel/lib/domain";

import { Iso } from "./iso";

export interface CountryProps {
  name: string;
  iso: Iso;
  currency: string;
  status: boolean;
}

export class Country extends Entity<CountryProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get iso(): string {
    return this.props.iso.value;
  }

  get currency(): string {
    return this.props.currency;
  }

  get status(): boolean {
    return this.props.status;
  }

  constructor(props: CountryProps, id?: UniqueEntityId) {
    super(props, id);
  }
}
