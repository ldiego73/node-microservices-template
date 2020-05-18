import { deleteCountryUseCase } from '@micro/country-core/lib/application/use-cases/delete-country';
import { DeleteCountryCommand } from './delete-country.command';

const deleteCountryCommand = new DeleteCountryCommand(
  deleteCountryUseCase
).create();

export { deleteCountryCommand };
