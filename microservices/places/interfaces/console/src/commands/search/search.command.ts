import { SearchDto } from "@micro/places-core/lib/application/dtos";
import { SearchAddressUseCase } from "@micro/places-core/lib/application/use-cases/search-address";
import * as Commander from "commander";
import prompts, { Answers, PromptObject } from "prompts";

import { BaseCommand } from "../base.command";

export class SearchCommand extends BaseCommand {
  private useCase: SearchAddressUseCase;

  constructor(useCase: SearchAddressUseCase) {
    super("search", "Search a Address by address");
    this.useCase = useCase;
  }

  private createQuestions(): PromptObject[] {
    const countryQuestion: PromptObject = {
      type: "text",
      name: "country",
      message: "Enter country iso",
    };

    const addressQuestion: PromptObject = {
      type: "text",
      name: "address",
      message: "Enter address",
    };

    return [countryQuestion, addressQuestion];
  }

  protected async action(): Promise<void> {
    const response: Answers<string> = await prompts(this.createQuestions());
    const search = response as SearchDto;

    this.log.info("Search address...");

    try {
      const result = await this.useCase.execute(search);

      if (result.isFailure()) {
        const { error } = result;
        this.log.error("Address", error.message);
      } else {
        this.log.info("Address", result.value);
      }
    } catch (err) {
      this.log.error("Address", err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
