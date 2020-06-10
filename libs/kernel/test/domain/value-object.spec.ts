import { UserEmail, UserPassword } from "./models";

describe("ValueObject", () => {
  const emailValue = "ldiego73@gmail.com";
  const passwordValue = "12345678";

  describe("UserEmail", () => {
    it("should create an instance", () => {
      expect(UserEmail.create(emailValue)).toBeTruthy();
    });

    it("should compare two emails", () => {
      const email1 = UserEmail.create(emailValue);
      const email2 = UserEmail.create(emailValue);

      expect(email1.equals(email2)).toBeTruthy();
      expect(email2.equals(email1)).toBeTruthy();
    });

    it("should email compare with itself", () => {
      const email = UserEmail.create(emailValue);

      expect(email.value).toEqual(emailValue);
    });

    it("should email is nullable", () => {
      expect(() => UserEmail.create()).toThrowError(
        new Error("The email is null or undefined")
      );
    });

    it("should email is format incorrect", () => {
      expect(() => UserEmail.create("ldiego73")).toThrowError(
        /The email is not in the correct format/
      );
    });

    it("should email equals is undefined", () => {
      const email = UserEmail.create(emailValue);
      expect(email.equals()).toBeFalsy();
    });
  });

  describe("UserPassword", () => {
    it("should create an instance", () => {
      expect(UserPassword.create(passwordValue)).toBeTruthy();
    });

    it("should compare two passwords", () => {
      const password1 = UserPassword.create(passwordValue);
      const password2 = UserPassword.create(passwordValue);

      expect(password1.equals(password2)).toBeTruthy();
      expect(password2.equals(password1)).toBeTruthy();
    });

    it("should password compare with itself", () => {
      const password = UserPassword.create(passwordValue);

      expect(password.value).toEqual(passwordValue);
    });

    it("should password is nullable", () => {
      expect(() => UserPassword.create()).toThrowError(
        new Error("The password is null or undefined")
      );
    });

    it("should passowrd is format not must have a minimum of 8 digits", () => {
      expect(() => UserPassword.create("asa")).toThrowError(
        /The password must have a minimum of 8 digits/
      );
    });

    it("should passowrd equals is undefined", () => {
      const email = UserEmail.create(emailValue);
      expect(email.equals()).toBeFalsy();
    });
  });
});
