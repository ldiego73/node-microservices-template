import { IsoDto } from "@micro/countries-core";
import { DeleteCountryUseCase } from "@micro/countries-core/lib/application/use-cases/delete-country";
import * as Commander from "commander";
import prompts from "prompts";

import { BaseCommand } from "../base.command";

export class DeleteCommand extends BaseCommand {
  private useCase: DeleteCountryUseCase;

  constructor(useCase: DeleteCountryUseCase) {
    super("delete", "Delete a Country by ISO");
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    const response = await prompts({
      type: "text",
      name: "iso",
      message: "Enter country iso",
    });

    try {
      const dto: IsoDto = {
        iso: response.iso,
      };
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error("Country", error.message);
      } else {
        this.log.info("Deleted country!!!");
      }
    } catch (err) {
      this.log.error("Country", err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
