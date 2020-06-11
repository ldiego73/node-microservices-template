import { addressRepository } from "../../../infraestructure";
import { AddressMapper } from "../../mappers";
import { SearchAddressUseCase } from "./search-address.use-case";

const mapper = new AddressMapper();
const searchAddressUseCase = new SearchAddressUseCase(
  addressRepository,
  mapper
);

export * from "./search-address.use-case";
export { searchAddressUseCase };
