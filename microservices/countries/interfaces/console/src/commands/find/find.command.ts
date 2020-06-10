import { IsoDto } from "@micro/countries-core/lib/application/dtos";
import { FindCountryUseCase } from "@micro/countries-core/lib/application/use-cases/find-country";
import * as Commander from "commander";
import prompts from "prompts";

import { BaseCommand } from "../base.command";

export class FindCommand extends BaseCommand {
  private useCase: FindCountryUseCase;

  constructor(useCase: FindCountryUseCase) {
    super("find", "Find a Country by ISO");
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    const response = await prompts({
      type: "text",
      name: "iso",
      message: "Enter country iso",
    });

    this.log.info("Filtering country...");

    try {
      const dto: IsoDto = {
        iso: response.iso,
      };
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error("Country", error.message);
      } else {
        this.log.info("Country", result.value);
      }
    } catch (err) {
      this.log.error("Country", err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
