import { ValueObject } from "../../../src/domain/value-object";

interface UserEmailProps {
  value: string;
}

const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class UserEmail extends ValueObject<UserEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  public static create(email?: string): UserEmail {
    if (email === null || email === undefined) {
      throw new Error("The email is null or undefined");
    }

    if (!EMAIL_REGEXP.test(email)) {
      throw new Error("The email is not in the correct format");
    }

    return new UserEmail({ value: email });
  }
}
