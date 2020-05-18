import { CountryRepositoryImpl } from '@infraestructure/repositories/index';
import { FindCountryUseCase } from './find-country.use-case';

const repository = new CountryRepositoryImpl();
const findCountryUseCase = new FindCountryUseCase(repository);

export * from './find-country.use-case';
export { findCountryUseCase };
