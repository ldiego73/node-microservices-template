import { MicroApplication } from "@micro/kernel";
import { program } from "commander";

import { geocodeCommand, searchCommand } from "./commands";

export class PlaceConsoleApplication extends MicroApplication {
  start(): void {
    program
      .description("Places Console Interface")
      .addCommand(geocodeCommand)
      .addCommand(searchCommand)
      .parse(process.argv);
  }
}
