import { findCountryUseCase } from '@micro/country-core/lib/application/use-cases/find-country';
import { FindCountryCommand } from './find-country.command';

const findCountryCommand = new FindCountryCommand(findCountryUseCase).create();

export { findCountryCommand };
