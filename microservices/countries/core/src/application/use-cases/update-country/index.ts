import { countryRepository } from "../../../infraestructure";
import { UpdateCountryUseCase } from "./update-country.use-case";

const updateCountryUseCase = new UpdateCountryUseCase(countryRepository);

export * from "./update-country.error";
export * from "./update-country.use-case";
export { updateCountryUseCase };
