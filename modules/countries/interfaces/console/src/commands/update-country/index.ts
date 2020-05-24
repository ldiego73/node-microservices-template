import { updateCountryUseCase } from '@micro/country-core/lib/application/use-cases/update-country';
import { UpdateCountryCommand } from './update-country.command';
import { findCountryUseCase } from '@micro/country-core';

const updateCountryCommand = new UpdateCountryCommand(
  updateCountryUseCase,
  findCountryUseCase
).create();

export { updateCountryCommand };
