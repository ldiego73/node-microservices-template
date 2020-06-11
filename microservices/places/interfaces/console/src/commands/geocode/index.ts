import { geocodeAddressUseCase } from "@micro/places-core/lib/application/use-cases/geocode-address";

import { GeocodeCommand } from "./geocode.command";

const geocodeCommand = new GeocodeCommand(geocodeAddressUseCase).create();

export { geocodeCommand };
