/*eslint prefer-const: 0*/

import { UniqueEntityId } from "../../src/domain/unique-entity-id";
import { User, UserEmail, UserPassword } from "./models";

describe("Entity", () => {
  let user: User;
  let email: UserEmail;
  let password: UserPassword;

  beforeEach(() => {
    email = UserEmail.create("ldiego73@gmail.com");
    password = UserPassword.create("12345678");

    user = User.create({
      username: "ldiego73",
      password,
      email,
      isEmailVerified: true,
    });
  });

  it("should create an instance", () => {
    expect(user).toBeTruthy();
  });

  it("should if the entity is valid", () => {
    const id: UniqueEntityId = new UniqueEntityId();

    const newUser = User.create(
      {
        username: "ldiego73",
        password,
        email,
        isEmailVerified: true,
      },
      id
    );

    const otherUser = User.create(
      {
        username: "ldiego73",
        password,
        email,
        isEmailVerified: true,
      },
      id
    );

    expect(newUser.equals(otherUser)).toBeTruthy();
  });

  it("should compare entity with nullable or undefined", () => {
    expect(user.equals()).toBeFalsy();
    expect(user.equals(undefined)).toBeFalsy();
  });

  it("should compare the entity with itself", () => {
    expect(user.equals(user)).toBeTruthy();
  });

  it("should validate entity fields", () => {
    const id = new UniqueEntityId(Math.random());
    const username = "ldiego73";
    const isEmailVerified = true;

    const user = User.create(
      {
        username,
        password,
        email,
        isEmailVerified,
      },
      id
    );

    expect(user.id.equals(id)).toBeTruthy();
    expect(user.username).toEqual(username);
    expect(user.password).toEqual(password);
    expect(user.email).toEqual(email);
    expect(user.isEmailVerified).toEqual(isEmailVerified);
  });

  it("should validate change username", () => {
    const id = new UniqueEntityId(Math.random());
    const isEmailVerified = true;

    let username = "ldiego73";

    const user = User.create(
      {
        username,
        password,
        email,
        isEmailVerified,
      },
      id
    );

    user.username = "lfdiego7";

    expect(user.username).not.toEqual(username);
  });
});
