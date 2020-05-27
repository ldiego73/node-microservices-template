import { CountryRepositoryImpl } from '../../../infraestructure/repositories';
import { UpdateCountryUseCase } from './update-country.use-case';

const repository = new CountryRepositoryImpl();
const updateCountryUseCase = new UpdateCountryUseCase(repository);

export * from './update-country.error';
export * from './update-country.use-case';
export { updateCountryUseCase };
