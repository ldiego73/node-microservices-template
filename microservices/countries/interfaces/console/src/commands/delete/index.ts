import { deleteCountryUseCase } from '@micro/country-core/lib/application/use-cases/delete-country';
import { DeleteCommand } from './delete.command';

const deleteCommand = new DeleteCommand(
  deleteCountryUseCase
).create();

export { deleteCommand };
