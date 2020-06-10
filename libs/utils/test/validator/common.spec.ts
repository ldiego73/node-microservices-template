import {
  isArray,
  isArrayWithItems,
  isBoolean,
  isDate,
  isError,
  isNull,
  isNullOrUndefined,
  isNumber,
  isObject,
  isObjectWithItems,
  isPattern,
  isString,
  isUndefined,
} from "../../src/validator";

describe("Validator Common", () => {
  it("should be the object is undefined", () => {
    const value = undefined;

    expect(isUndefined(value)).toBeTruthy();
  });

  it("should be the object is null", () => {
    const value = null;

    expect(isNull(value)).toBeTruthy();
  });

  it("should be the object is null or undefined", () => {
    const value1 = undefined;
    const value2 = null;

    expect(isNullOrUndefined(value1)).toBeTruthy();
    expect(isNullOrUndefined(value2)).toBeTruthy();
  });

  it("should be the object is number", () => {
    const value = Math.random();

    expect(isNumber(value)).toBeTruthy();
  });

  it("should be the object is string", () => {
    const value =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    expect(isString(value)).toBeTruthy();
  });

  it("should be the object is boolean", () => {
    const value = false;

    expect(isBoolean(value)).toBeTruthy();
  });

  it("should be the object is array", () => {
    const value: string[] = [];

    expect(isArray(value)).toBeTruthy();
  });

  it("should be the object is object", () => {
    const value = {};

    expect(isObject(value)).toBeTruthy();
  });

  it("should be the object is error", () => {
    const value = new Error();

    expect(isError(value)).toBeTruthy();
  });

  it("should be the object is date", () => {
    const value = new Date();

    expect(isDate(value)).toBeTruthy();
  });

  it("should be the object is pattern", () => {
    const numbersPattern = /^\d+$/;
    const alphanumericPattern = /^[a-zA-Z0-9 ]*$/;
    const urlPattern = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    const datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
    const timePattern = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/;

    expect(isPattern(numbersPattern)).toBeTruthy();
    expect(isPattern(alphanumericPattern)).toBeTruthy();
    expect(isPattern(urlPattern)).toBeTruthy();
    expect(isPattern(datePattern)).toBeTruthy();
    expect(isPattern(timePattern)).toBeTruthy();
  });

  it("should be the object is array with items", () => {
    const value: number[] = [1, 2, 3];

    expect(isArrayWithItems(value)).toBeTruthy();
  });

  it("should be the object is object with items", () => {
    const value = { status: true, message: "OK" };

    expect(isObjectWithItems(value)).toBeTruthy();
  });
});
