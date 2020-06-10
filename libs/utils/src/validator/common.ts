export const typeOf = (type: string) => (value: any): boolean =>
  typeof value === type;

export const toType = (value: any): string =>
  Object.prototype.toString
    .call(value)
    .match(/\s([a-z|A-Z]+)/)![1]
    .toLowerCase();

export const isUndefined = (value: any): value is undefined =>
  typeOf("undefined")(value);

export const isNull = (value: any): value is null => value === null;

export const isNullOrUndefined = (value: any): value is null | undefined =>
  isUndefined(value) || isNull(value);

export const isNumber = (value: any): value is number =>
  typeOf("number")(value) && !isNaN(value);

export const isString = (value: any): value is string =>
  typeOf("string")(value);

export const isBoolean = (value: any): value is boolean =>
  typeOf("boolean")(value);

export const isArray = (value: any): boolean => toType(value) === "array";
export const isObject = (value: any): boolean => toType(value) === "object";
export const isError = (value: any): boolean => toType(value) === "error";
export const isDate = (value: any): boolean => toType(value) === "date";
export const isPattern = (value: any): boolean => toType(value) === "regexp";
export const isArrayWithItems = (value: any): boolean =>
  isArray(value) && (value as Array<any>).length > 0;
export const isObjectWithItems = (value: any): boolean =>
  isObject(value) && Object.keys(value).length > 0;
