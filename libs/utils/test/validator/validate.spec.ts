import * as validator from "../../src/validator";
import { Schema, Validator } from "../../src/validator";
import { Customer, Phones } from "../models/customer";

describe("Validator", () => {
  describe("Custom", () => {
    it("should be the value is number", () => {
      const value = Math.random();
      const result = validator.number()(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is string", () => {
      const value =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const result = validator.string()(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is greater than 100 correct", () => {
      const value = 101;
      const result = validator.gt(100)(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is greater than 100 incorrect", () => {
      const value = 10;
      const result = validator.gt(100)(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is greater than 100");
    });

    it("should be the value is greater than or equal to 100 correct", () => {
      const value = 100;
      const result = validator.gte(100)(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is greater than or equal to 100 incorrect", () => {
      const value = 10;
      const result = validator.gte(100)(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is greater than or equal to 100");
    });

    it("should be the value is less than 100 correct", () => {
      const value = 10;
      const result = validator.lt(100)(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is less than 100 incorrect", () => {
      const value = 100;
      const result = validator.lt(100)(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is less than 100");
    });

    it("should be the value is less than or equal to 100 correct", () => {
      const value = 100;
      const result = validator.lte(100)(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is less than or equal to 100 incorrect", () => {
      const value = 101;
      const result = validator.lte(100)(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is less than or equal to 100");
    });

    it("should be the value is boolean correct", () => {
      const value = true;
      const result = validator.boolean()(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is boolean incorrect", () => {
      const result = validator.boolean()("true" as any);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is not boolean");
    });

    it("should be the value is any correct", () => {
      const value = Math.random();
      const result = validator.any()(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is any inccorrect", () => {
      const value = null;
      const result = validator.any()(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is null or undefined");
    });

    it("should be the value is optional correct", () => {
      const value = null as any;
      const result = validator.optional(validator.string())(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is optional inccorrect", () => {
      const value = 4 as any;
      const result = validator.optional(validator.string())(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is not string");
    });

    it("should be the value is array correct", () => {
      const value = [1, 2, 3];
      const result = validator.array(validator.number())(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is array inccorrect", () => {
      const result = validator.array(validator.number())({} as any);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is not array");
    });

    it("should be the value is array inccorrect in values", () => {
      const result = validator.array(validator.number())([1, "2", 3] as any);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is not number");
    });

    it("should be the value is time correct", () => {
      const timePattern = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/;
      const time = "23:00:00";
      const result = validator.pattern(timePattern)(time);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is time incorrect", () => {
      const timePattern = /(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/;
      const time = "24:00:00";
      const result = validator.pattern(timePattern)(time);

      expect(result.success).toBeFalsy();
    });

    it("should be the value is equal correct", () => {
      const value = true;
      const result = validator.equal(true)(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is equal inccorrect", () => {
      const value = false;
      const result = validator.equal(true)(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("is not equal");
    });

    it("should be the value is options correct", () => {
      const value = "M";
      const result = validator.options("M", "F")(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value is options inccorrect", () => {
      const value = "-";
      const result = validator.options("M", "F")(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("not found in options");
    });

    it("should be the value active or inactive correct", () => {
      const value = "active";
      const result = validator.or(
        validator.equal("active"),
        validator.equal("inactive")
      )(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value active or inactive incorrect", () => {
      const value = "stand by";
      const result = validator.or(
        validator.equal("active"),
        validator.equal("inactive")
      )(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("not satisfy with any condition");
    });

    it("should be the value greater than 10 and less than 20 correct", () => {
      const value = 15;
      const result = validator.and(validator.gt(10), validator.lt(20))(value);

      expect(result.success).toBeTruthy();
    });

    it("should be the value greater than 10 and less than 20 incorrect", () => {
      const value = 0;
      const result = validator.and(validator.gt(10), validator.lt(20))(value);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("not satisfy with both condition");
    });
  });

  describe("Customer", () => {
    let phones: Phones;
    let customer: Customer;
    let schema: Schema<Customer>;
    let customerValidate: Validator<Customer>;

    beforeEach(() => {
      phones = {
        mobile: "+51943527457",
        home: "+5114843589",
      };

      customer = {
        id: 1,
        firstName: "Luis",
        lastName: "Diego",
        email: "ldiego@gmail.com",
        gender: "M",
        age: 30,
        status: true,
        addresses: ["Lima, Peru", "SMP, Lima"],
        phones,
      };

      schema = {
        id: validator.number(),
        firstName: validator.string(),
        lastName: validator.string(),
        email: validator.pattern(
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ),
        gender: validator.optional(validator.options("M", "F")),
        age: validator.and(validator.gte(18), validator.lte(65)),
        status: validator.boolean(),
        addresses: validator.array(validator.string()),
        phones: validator.map<string>(validator.string()),
      };

      customerValidate = validator.object(schema);
    });

    it("should be the object is valid using schema", () => {
      const result = validator.validate<Customer>(schema, customer);

      expect(result.success).toBeTruthy();
    });

    it("should be the object is valid using validate", () => {
      const result = customerValidate(customer);

      expect(result.success).toBeTruthy();
    });

    it("should be the object is valid using schema with null values", () => {
      const result = validator.validate<Customer>(schema, {} as Customer);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("values is not object");
    });

    it("should be the object is valid using validate with null values", () => {
      const result = customerValidate({} as Customer);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("values is not object");
    });

    it("should be the object is invalid", () => {
      customer.age = 100;
      schema.age = validator.and(validator.gt(18), validator.lt(65));

      const result = validator.validate<Customer>(schema, customer);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("[age]: not satisfy with both condition");
    });

    it("should be the object validate map", () => {
      const result = validator.validateMap<string>(validator.string(), phones);

      expect(result.success).toBeTruthy();
    });

    it("should be the object validate map incorrect", () => {
      const result = validator.validateMap<string>(validator.string(), {
        mobile: 943527457,
        home: 4843589,
      } as any);

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("[mobile]: is not string");
    });

    it("should be the object validate map and empty values", () => {
      const result = validator.validateMap<string>(
        validator.string(),
        {} as any
      );

      expect(result.success).toBeFalsy();
      expect(result.message).toEqual("values is not object");
    });

    it("should be the object validate with bulk", () => {
      const result = validator.validateBulk<Customer>(schema, {
        id: null,
        firstName: "Luis",
        lastName: "Diego",
        email: "ldiego",
        age: 100,
        status: true,
        addresses: [],
        phones: {
          mobile: 943527457,
          home: 4843589,
        },
      } as any);

      expect(result.success).toBeFalsy();

      expect(result.messages[0]).toEqual("[id]: is not number");
      expect(result.messages[1]).toEqual("[email]: is wrong pattern");
      expect(result.messages[2]).toEqual(
        "[age]: not satisfy with both condition"
      );
      expect(result.messages[3]).toEqual("[phones]: [mobile]: is not string");
    });

    it("should be the object validate with bulk and empty values", () => {
      const result = validator.validateBulk<Customer>(schema, {} as any);

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual("values is not object");
    });

    it("should be the object validate map with bulk", () => {
      const result = validator.validateMapBulk<string>(
        validator.string(),
        phones
      );

      expect(result.success).toBeTruthy();
    });

    it("should be the object validate map with bulk incorrect", () => {
      const result = validator.validateMapBulk<string>(validator.string(), {
        mobile: 943527457,
        home: 4843589,
      } as any);

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual("[mobile]: is not string");
      expect(result.messages[1]).toEqual("[home]: is not string");
    });

    it("should be the object validate map with bulk and empty values", () => {
      const result = validator.validateMapBulk<string>(
        validator.string(),
        {} as any
      );

      expect(result.success).toBeFalsy();
      expect(result.messages[0]).toEqual("values is not object");
    });
  });
});
