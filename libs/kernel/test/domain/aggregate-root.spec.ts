import { UniqueEntityId } from "../../src/domain/unique-entity-id";
import { Address, Contact } from "./models";

describe("AggregateRoot", () => {
  let address: Address;
  let contact: Contact;

  beforeEach(() => {
    address = Address.create({
      address: "Av. Lima 123",
      city: "Lima",
      latitude: "1.111",
      longitude: "2.222",
    });

    contact = Contact.create({
      firstName: "Luis",
      lastName: "Diego",
      age: 30,
      address,
      status: true,
    });
  });

  it("should create an instance", () => {
    expect(contact).toBeTruthy();
  });

  it("should if the entity is valid", () => {
    const id: UniqueEntityId = new UniqueEntityId();

    const newContact = Contact.create(
      {
        firstName: "Luis",
        lastName: "Diego",
        age: 30,
        address,
        status: true,
      },
      id
    );

    const otherContact = Contact.create(
      {
        firstName: "Luis",
        lastName: "Diego",
        age: 30,
        address,
        status: true,
      },
      id
    );

    expect(newContact.equals(otherContact)).toBeTruthy();
  });

  it("should compare aggregate root with nullable or undefined", () => {
    expect(contact.equals()).toBeFalsy();
    expect(contact.equals(undefined)).toBeFalsy();
  });

  it("should compare the aggregate root with itself", () => {
    expect(contact.equals(contact)).toBeTruthy();
  });

  it("should validate entity fields", () => {
    const id = new UniqueEntityId();

    const firstName = "Luis";
    const lastName = "Diego";
    const age = 30;
    const status = true;

    const contact = Contact.create(
      {
        firstName,
        lastName,
        age,
        address,
        status,
      },
      id
    );

    expect(contact.id.equals(id)).toBeTruthy();
    expect(contact.firstName).toEqual(firstName);
    expect(contact.lastName).toEqual(lastName);
    expect(contact.age).toEqual(age);
    expect(contact.birthday).toEqual(0);
    expect(contact.status).toEqual(status);

    expect(contact.address?.id).toEqual(address.id);
    expect(contact.address?.address).toEqual(address.address);
    expect(contact.address?.city).toEqual(address.city);
    expect(contact.address?.latitude).toEqual(address.latitude);
    expect(contact.address?.longitude).toEqual(address.longitude);
  });

  it("should validate change status", () => {
    const status = true;

    const contact = Contact.create({
      firstName: "Luis",
      lastName: "Diego",
      age: 30,
      address,
      status,
    });

    contact.status = false;

    expect(contact.status).not.toEqual(status);
  });

  it("should validate change birthday", () => {
    const birthday = 123;

    const contact = Contact.create({
      firstName: "Luis",
      lastName: "Diego",
      age: 30,
      address,
      status: true,
    });

    contact.birthday = birthday;

    expect(contact.birthday).not.toEqual(0);
  });

  it("should firstName is undefined", () => {
    expect(() =>
      Contact.create({
        lastName: "Diego",
        age: 30,
        address,
        status: true,
      })
    ).toThrowError(new Error("The firstName is undefined"));
  });

  it("should firstName is nullable", () => {
    const contact = Contact.create({
      firstName: null,
      lastName: "Diego",
      age: 30,
      address,
      status: true,
    });

    expect(contact.firstName).toEqual("");
  });

  it("should lastName is nullable", () => {
    const contact = Contact.create({
      firstName: "Luis",
      lastName: null,
      age: 30,
      address,
      status: true,
    });

    expect(contact.lastName).toEqual("");
  });

  it("should address is nullable", () => {
    expect(() =>
      Contact.create({
        firstName: "Luis",
        lastName: "Diego",
        age: 30,
        address: null,
        status: true,
      })
    ).toThrowError(/The address is null or undefined/);
  });
});
