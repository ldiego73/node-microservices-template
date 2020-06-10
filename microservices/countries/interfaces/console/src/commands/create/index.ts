import { createCountryUseCase } from "@micro/countries-core";

import { CreateCommand } from "./create.command";

const createCommand = new CreateCommand(createCountryUseCase).create();

export { createCommand };
