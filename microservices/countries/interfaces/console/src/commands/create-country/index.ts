import { createCountryUseCase } from '@micro/country-core';
import { CreateCountryCommand } from './create-country.command';

const createCountryCommand = new CreateCountryCommand(
  createCountryUseCase
).create();

export { createCountryCommand };
