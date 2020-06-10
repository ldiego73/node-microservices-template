import { ValueObject } from "../../../src/domain/value-object";

interface UserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPasswordProps) {
    super(props);
  }

  public static create(password?: string): UserPassword {
    if (password === null || password === undefined) {
      throw new Error("The password is null or undefined");
    }

    if (password.length < 8) {
      throw new Error("The password must have a minimum of 8 digits");
    }

    return new UserPassword({ value: password });
  }
}
