import { ListCountryUseCase } from "@micro/countries-core/lib/application/use-cases/list-country";
import * as Commander from "commander";

import { BaseCommand } from "../base.command";

export class ListCommand extends BaseCommand {
  private useCase: ListCountryUseCase;

  constructor(useCase: ListCountryUseCase) {
    super("list", "List all countries");
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    this.log.info("Listing countries...");

    try {
      const result = await this.useCase.execute();

      if (result.isFailure()) {
        this.log.error("Countries", result.error);
      } else {
        this.log.info("Countries", result.value);
      }
    } catch (err) {
      this.log.error("Countries", err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
