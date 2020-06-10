import { findCountryUseCase } from "@micro/countries-core";
import { updateCountryUseCase } from "@micro/countries-core/lib/application/use-cases/update-country";

import { UpdateCommand } from "./update.command";

const updateCommand = new UpdateCommand(
  updateCountryUseCase,
  findCountryUseCase
).create();

export { updateCommand };
