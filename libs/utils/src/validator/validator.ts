import {
  isArray,
  isBoolean,
  isNullOrUndefined,
  isNumber,
  isObjectWithItems,
  isString,
} from "./common";

export type Validator<T> = (value: T) => ValidatorResult;
export type Schema<T extends object> = {
  [key in keyof T]: Validator<T[key]>;
};

export interface ValidatorResult {
  success: boolean;
  message?: string;
}

export interface ValidatorGroupResult {
  success: boolean;
  messages: string[];
}

export const ok = (): ValidatorResult => ({ success: true });
export const fail = (message: string): ValidatorResult => ({
  success: false,
  message,
});

export function object<T extends object>(schema: Schema<T>): Validator<T> {
  return function (values: T) {
    return validate(schema, values);
  };
}

export function map<T>(fn: Validator<T>): Validator<{ [key: string]: T }> {
  return function (values: { [key: string]: T }) {
    return validateMap(fn, values);
  };
}

export function number(): Validator<number> {
  return function (value: any) {
    const result = isNumber(value);
    if (result) return ok();

    return fail(`is not number`);
  };
}

export function gt(n: number): Validator<number> {
  return function (value: number) {
    const result = isNumber(value) && value > n;

    if (result) return ok();

    return fail(`is greater than ${n}`);
  };
}

export function gte(n: number): Validator<number> {
  return function (value: number) {
    const result = isNumber(value) && value >= n;

    if (result) return ok();

    return fail(`is greater than or equal to ${n}`);
  };
}

export function lt(n: number): Validator<number> {
  return function (value: number) {
    const result = isNumber(value) && value < n;

    if (result) return ok();

    return fail(`is less than ${n}`);
  };
}

export function lte(n: number): Validator<number> {
  return function (value: number) {
    const result = isNumber(value) && value <= n;

    if (result) return ok();

    return fail(`is less than or equal to ${n}`);
  };
}

export function string(): Validator<string> {
  return function (value: any) {
    const result = isString(value);

    if (result) return ok();

    return fail(`is not string`);
  };
}

export function boolean(): Validator<boolean> {
  return function (value: any) {
    const result = isBoolean(value);

    if (result) return ok();

    return fail(`is not boolean`);
  };
}

export function any(): Validator<any> {
  return function (value: any) {
    const result = isNullOrUndefined(value);

    if (!result) return ok();

    return fail(`is null or undefined`);
  };
}

export function optional<T>(fn: Validator<T>): Validator<T | undefined> {
  return function (value: T | undefined) {
    if (isNullOrUndefined(value)) {
      return ok();
    } else {
      return fn(value);
    }
  };
}

export function array<T>(fn: Validator<T>): Validator<Array<T>> {
  return function (value: Array<T>) {
    if (!isArray(value)) {
      return fail("is not array");
    }
    for (const item of value) {
      const result = fn(item);
      if (!result.success) {
        return fail(result.message ?? "");
      }
    }
    return ok();
  };
}

export function pattern(regex: RegExp): Validator<string> {
  return function (value: string) {
    const result = regex.test(value);

    if (result) return ok();

    return fail(`is wrong pattern`);
  };
}

export function equal<T>(option: T): Validator<T> {
  return function (value: T) {
    const result = value === option;

    if (result) return ok();

    return fail(`is not equal`);
  };
}

export function options<T>(...options: Array<T>): Validator<T> {
  return function (value: T) {
    const result = options.some((option) => value === option);

    if (result) return ok();

    return fail(`not found in options`);
  };
}

export function or<X, Y>(x: Validator<X>, y: Validator<Y>): Validator<X | Y> {
  return function (value: X | Y) {
    const resultX = x(value as X).success;
    const resultY = y(value as Y).success;
    const result = resultX || resultY;

    if (result) return ok();

    return fail(`not satisfy with any condition`);
  };
}

export function and<X>(x: Validator<X>, y: Validator<X>): Validator<X> {
  return function (value: X) {
    const resultX = x(value).success;
    const resultY = y(value).success;
    const result = resultX && resultY;

    if (result) return ok();

    return fail(`not satisfy with both condition`);
  };
}

export function validate<T extends object>(
  schema: Schema<T>,
  values: T
): ValidatorResult {
  if (!isObjectWithItems(values)) return fail("values is not object");

  for (const key in schema) {
    const result = schema[key](values[key]);
    if (!result.success) {
      return fail(`[${key}]: ${result.message}`);
    }
  }

  return ok();
}

export function validateMap<T>(
  fn: Validator<T>,
  values: { [key: string]: T }
): ValidatorResult {
  if (!isObjectWithItems(values)) return fail("values is not object");

  for (const key in values) {
    const result = fn(values[key]);
    if (!result.success) {
      return fail(`[${key}]: ${result.message}`);
    }
  }
  return ok();
}

export function validateBulk<T extends object>(
  schema: Schema<T>,
  values: T
): ValidatorGroupResult {
  if (!isObjectWithItems(values))
    return { success: false, messages: ["values is not object"] };

  const messages: string[] = [];
  let success = false;

  for (const key in schema) {
    const result = schema[key](values[key]);

    success = result.success;

    if (!success) {
      messages.push(`[${key}]: ${result.message}`);
    }
  }

  return { success, messages };
}

export function validateMapBulk<T>(
  fn: Validator<T>,
  values: { [key: string]: T }
): ValidatorGroupResult {
  if (!isObjectWithItems(values))
    return { success: false, messages: ["values is not object"] };

  const messages: string[] = [];
  let success = false;

  for (const key in values) {
    const result = fn(values[key]);

    success = result.success;

    if (!success) {
      messages.push(`[${key}]: ${result.message}`);
    }
  }

  return { success, messages };
}
