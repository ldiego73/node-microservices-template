import { Module } from "@nestjs/common";

import { GeocodeResolver } from "./geocode.resolver";
import { GeocodeService } from "./geocode.service";

@Module({
  providers: [GeocodeResolver, GeocodeService],
})
export class GeocodeModule {}
