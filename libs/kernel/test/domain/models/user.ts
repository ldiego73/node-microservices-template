import { Entity } from "../../../src/domain/entity";
import { UniqueEntityId } from "../../../src/domain/unique-entity-id";
import { UserEmail } from "./user-email";
import { UserPassword } from "./user-password";

interface UserProps {
  username: string;
  password: UserPassword;
  email: UserEmail;
  isEmailVerified: boolean;
}

export class User extends Entity<UserProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  set username(value: string) {
    this.props.username = value;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  public static create(props: UserProps, id?: UniqueEntityId): User {
    return new User(props, id);
  }
}
