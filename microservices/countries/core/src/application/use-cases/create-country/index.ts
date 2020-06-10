import { countryRepository } from "../../../infraestructure";
import { CreateCountryUseCase } from "./create-country.use-case";

const createCountryUseCase = new CreateCountryUseCase(countryRepository);

export * from "./create-country.error";
export * from "./create-country.use-case";
export { createCountryUseCase };
