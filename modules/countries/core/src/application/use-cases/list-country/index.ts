import { CountryRepositoryImpl } from '@infraestructure/repositories/index';
import { ListCountryUseCase } from './list-country.use-case';

const repository = new CountryRepositoryImpl();
const listCountryUseCase = new ListCountryUseCase(repository);

export * from './list-country.use-case';
export { listCountryUseCase };
