import { MicroApplication } from "@micro/kernel";
import { program } from "commander";

import {
  createCommand,
  deleteCommand,
  findCommand,
  listCommand,
  updateCommand,
} from "./commands";

export class CountryConsoleApplication extends MicroApplication {
  start(): void {
    program
      .description("Country Console Interface")
      .addCommand(listCommand)
      .addCommand(findCommand)
      .addCommand(createCommand)
      .addCommand(updateCommand)
      .addCommand(deleteCommand)
      .parse(process.argv);
  }
}
