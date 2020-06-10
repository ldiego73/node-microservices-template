import { AggregateRoot } from "../../../src/domain/aggregate-root";
import { UniqueEntityId } from "../../../src/domain/unique-entity-id";
import { Address } from "./address";

interface ContactProps {
  firstName?: string | null;
  lastName: string | null;
  age: number;
  birthday?: number;
  address: Address | null;
  status: boolean;
}

export class Contact extends AggregateRoot<ContactProps> {
  get firstName(): string {
    return this.props.firstName ?? "";
  }

  get lastName(): string {
    return this.props.lastName ?? "";
  }

  get age(): number {
    return this.props.age;
  }

  get address(): Address | null {
    return this.props.address;
  }

  get status(): boolean {
    return this.props.status;
  }

  set status(value: boolean) {
    this.props.status = value;
  }

  get birthday(): number {
    return this.props.birthday ?? 0;
  }

  set birthday(value: number) {
    this.props.birthday = value;
  }

  public static create(props: ContactProps, id?: UniqueEntityId): Contact {
    if (props.firstName === undefined) {
      throw new Error("The firstName is undefined");
    }

    if (props.address === null || props.address === undefined) {
      throw new Error("The address is null or undefined");
    }

    return new Contact(props, id);
  }
}
