import { countryRepository } from "../../../infraestructure";
import { DeleteCountryUseCase } from "./delete.use-case";

const deleteCountryUseCase = new DeleteCountryUseCase(countryRepository);

export * from "./delete.use-case";
export { deleteCountryUseCase };
