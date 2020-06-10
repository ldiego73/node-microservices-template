import { Identifier } from "../../src/domain/identifier";

describe("Identifier", () => {
  let _id: number;

  beforeEach(() => {
    _id = Math.random();
  });

  it("should create an instance", () => {
    expect(new Identifier<number>(_id)).toBeTruthy();
  });

  it("should compare two identifiers", () => {
    const id1 = new Identifier(_id);
    const id2 = new Identifier(_id);

    expect(id1.equals(id2)).toBe(true);
    expect(id2.equals(id1)).toBe(true);
  });

  it("should compare two incorrect identifiers", () => {
    const id1 = new Identifier(_id);
    const id2 = new Identifier(0);

    expect(id1.equals(id2)).toBe(false);
    expect(id2.equals(id1)).toBe(false);
  });

  it("should compare identifier with nullable or undefined", () => {
    const id = new Identifier(_id);

    expect(id.equals()).toBe(false);
    expect(id.equals(undefined)).toBe(false);
  });

  it("should return a id convert to string", () => {
    const originalId = _id.toString();
    const id = new Identifier(_id);

    expect(id.toString()).toBe(originalId);
  });
});
