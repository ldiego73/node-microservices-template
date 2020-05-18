import { listCountryUseCase } from '@micro/country-core/lib/application/use-cases/list-country';
import { ListCountryCommand } from './list-country.command';

const listCountryCommand = new ListCountryCommand(listCountryUseCase).create();

export { listCountryCommand };
