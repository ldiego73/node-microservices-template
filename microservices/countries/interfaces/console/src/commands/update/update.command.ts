import { CountryDto,FindCountryUseCase, IsoDto } from "@micro/countries-core";
import { UpdateCountryUseCase } from "@micro/countries-core/lib/application/use-cases/update-country";
import * as Commander from "commander";
import prompts, { Answers,PromptObject } from "prompts";

import { BaseCommand } from "../base.command";

export class UpdateCommand extends BaseCommand {
  private useCase: UpdateCountryUseCase;
  private findUseCase: FindCountryUseCase;

  constructor(useCase: UpdateCountryUseCase, findUseCase: FindCountryUseCase) {
    super("update", "Update a Country");
    this.useCase = useCase;
    this.findUseCase = findUseCase;
  }

  private createQuestions(dto: CountryDto): PromptObject[] {
    const nameQuestion: PromptObject = {
      type: "text",
      name: "name",
      initial: dto.name,
      message: "Enter country name",
    };

    const isoQuestion: PromptObject = {
      type: "text",
      name: "iso",
      initial: dto.iso,
      message: "Enter country iso",
    };

    const currencyQuestion: PromptObject = {
      type: "text",
      name: "currency",
      initial: dto.currency,
      message: "Enter country currency",
    };

    const statusQuestion: PromptObject = {
      type: "confirm",
      name: "status",
      initial: dto.status,
      message: "Enter country status",
    };

    return [nameQuestion, isoQuestion, currencyQuestion, statusQuestion];
  }

  private async find(): Promise<CountryDto> {
    const response = await prompts({
      type: "text",
      name: "iso",
      message: "Enter country iso",
    });

    const dto: IsoDto = {
      iso: response.iso,
    };
    const result = await this.findUseCase.execute(dto);

    if (result.isFailure()) {
      throw new Error(result.error.message);
    }

    return result.value;
  }

  protected async action(): Promise<void> {
    try {
      const dto = await this.find();
      const response: Answers<string> = await prompts(
        this.createQuestions(dto)
      );
      const country = response as CountryDto;

      this.log.info("Updating country...", country);

      const result = await this.useCase.execute(country);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error("Country", error.message);
      } else {
        this.log.info("Country updated!!!");
      }
    } catch (err) {
      this.log.error("Country", err.message);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
