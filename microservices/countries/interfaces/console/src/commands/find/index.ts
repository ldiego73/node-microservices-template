import { findCountryUseCase } from '@micro/country-core/lib/application/use-cases/find-country';
import { FindCommand } from './find.command';

const findCommand = new FindCommand(findCountryUseCase).create();

export { findCommand };
