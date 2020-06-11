import { searchAddressUseCase } from "@micro/places-core/lib/application/use-cases/search-address";

import { SearchCommand } from "./search.command";

const searchCommand = new SearchCommand(searchAddressUseCase).create();

export { searchCommand };
