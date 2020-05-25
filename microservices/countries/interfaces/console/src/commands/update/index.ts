import { updateCountryUseCase } from '@micro/countries-core/lib/application/use-cases/update-country';
import { UpdateCommand } from './update.command';
import { findCountryUseCase } from '@micro/countries-core';

const updateCommand = new UpdateCommand(
  updateCountryUseCase,
  findCountryUseCase
).create();

export { updateCommand };
