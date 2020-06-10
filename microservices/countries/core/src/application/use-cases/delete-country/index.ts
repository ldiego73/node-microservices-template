import { CountryRepositoryImpl } from "../../../infraestructure/repository";
import { DeleteCountryUseCase } from "./delete.use-case";

const repository = new CountryRepositoryImpl();
const deleteCountryUseCase = new DeleteCountryUseCase(repository);

export * from "./delete.use-case";
export { deleteCountryUseCase };
