import { addressRepository } from "../../../infraestructure";
import { AddressMapper } from "../../mappers";
import { GeocodeAddressUseCase } from "./geocode-address.use-case";

const mapper = new AddressMapper();
const geocodeAddressUseCase = new GeocodeAddressUseCase(
  addressRepository,
  mapper
);

export * from "./geocode-address.use-case";
export { geocodeAddressUseCase };
