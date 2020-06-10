import { deleteCountryUseCase } from "@micro/countries-core/lib/application/use-cases/delete-country";

import { DeleteCommand } from "./delete.command";

const deleteCommand = new DeleteCommand(deleteCountryUseCase).create();

export { deleteCommand };
