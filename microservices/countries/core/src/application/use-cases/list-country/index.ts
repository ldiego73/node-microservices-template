import { countryRepository } from "../../../infraestructure";
import { CountryMapper } from "../../mappers";
import { ListCountryUseCase } from "./list-country.use-case";

const mapper = new CountryMapper();
const listCountryUseCase = new ListCountryUseCase(countryRepository, mapper);

export * from "./list-country.use-case";
export { listCountryUseCase };
