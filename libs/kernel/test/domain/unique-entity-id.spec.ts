import { UniqueEntityId } from "../../src/domain/unique-entity-id";

describe("UniqueEntityId", () => {
  it("should create an instance", () => {
    expect(new UniqueEntityId()).toBeTruthy();
  });

  it("should create an unique entity id string or number", () => {
    const code = "CODE";
    const id = 123;

    const id1 = new UniqueEntityId(code);
    const id2 = new UniqueEntityId(id);

    expect(id1.toValue()).toEqual(code);
    expect(id2.toValue()).toEqual(id);
  });

  it("should compare two identifiers", () => {
    const id: number = Math.random();

    const id1 = new UniqueEntityId(id);
    const id2 = new UniqueEntityId(id);

    expect(id1.equals(id2)).toBe(true);
    expect(id2.equals(id1)).toBe(true);
  });

  it("should compare two incorrect identifiers", () => {
    const id1 = new UniqueEntityId(Math.random());
    const id2 = new UniqueEntityId();

    expect(id1.equals(id2)).toBe(false);
    expect(id2.equals(id1)).toBe(false);
  });

  it("should validate that two unique entity id are differents", () => {
    const id1 = new UniqueEntityId();
    const id2 = new UniqueEntityId();

    expect(id1.toValue()).not.toEqual(id2.toValue());
    expect(id2.toValue()).not.toEqual(id1.toValue());
  });
});
