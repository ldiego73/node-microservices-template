import { updateCountryUseCase } from '@micro/country-core/lib/application/use-cases/update-country';
import { UpdateCountryCommand } from './update-country.command';

const updateCountryCommand = new UpdateCountryCommand(
  updateCountryUseCase
).create();

export { updateCountryCommand };
