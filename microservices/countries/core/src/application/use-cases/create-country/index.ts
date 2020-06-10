import { CountryRepositoryImpl } from '../../../infraestructure/repository';
import { CreateCountryUseCase } from './create-country.use-case';

const repository = new CountryRepositoryImpl();
const createCountryUseCase = new CreateCountryUseCase(repository);

export * from './create-country.error';
export * from './create-country.use-case';
export { createCountryUseCase };
