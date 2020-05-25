import { updateCountryUseCase } from '@micro/country-core/lib/application/use-cases/update-country';
import { UpdateCommand } from './update.command';
import { findCountryUseCase } from '@micro/country-core';

const updateCommand = new UpdateCommand(
  updateCountryUseCase,
  findCountryUseCase
).create();

export { updateCommand };
