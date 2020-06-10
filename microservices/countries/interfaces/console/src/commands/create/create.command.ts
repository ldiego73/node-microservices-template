import { CountryDto } from "@micro/countries-core";
import { CreateCountryUseCase } from "@micro/countries-core/lib/application/use-cases/create-country";
import * as Commander from "commander";
import prompts, { Answers,PromptObject } from "prompts";

import { BaseCommand } from "../base.command";

export class CreateCommand extends BaseCommand {
  private useCase: CreateCountryUseCase;

  constructor(useCase: CreateCountryUseCase) {
    super("create", "Create a Country");
    this.useCase = useCase;
  }

  private createQuestions(): PromptObject[] {
    const nameQuestion: PromptObject = {
      type: "text",
      name: "name",
      message: "Enter country name",
    };

    const isoQuestion: PromptObject = {
      type: "text",
      name: "iso",
      message: "Enter country iso",
    };

    const currencyQuestion: PromptObject = {
      type: "text",
      name: "currency",
      message: "Enter country currency",
    };

    const statusQuestion: PromptObject = {
      type: "confirm",
      name: "status",
      message: "Enter country status",
      initial: true,
    };

    return [nameQuestion, isoQuestion, currencyQuestion, statusQuestion];
  }

  protected async action(): Promise<void> {
    const response: Answers<string> = await prompts(this.createQuestions());
    const country = response as CountryDto;

    this.log.info("Creating country...", country);

    try {
      const result = await this.useCase.execute(country);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error("Country", error.message);
      } else {
        this.log.info("Country created!!!");
      }
    } catch (err) {
      this.log.error("Country", err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
