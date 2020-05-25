import { createCountryUseCase } from '@micro/country-core';
import { CreateCommand } from './create.command';

const createCommand = new CreateCommand(
  createCountryUseCase
).create();

export { createCommand };
