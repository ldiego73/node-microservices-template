import { listCountryUseCase } from '@micro/country-core/lib/application/use-cases/list-country';
import { ListCommand } from './list.command';

const listCommand = new ListCommand(listCountryUseCase).create();

export { listCommand };
