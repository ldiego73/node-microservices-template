import { LocationDto } from "@micro/places-core/lib/application/dtos";
import { GeocodeAddressUseCase } from "@micro/places-core/lib/application/use-cases/geocode-address";
import * as Commander from "commander";
import prompts, { Answers,PromptObject } from "prompts";

import { BaseCommand } from "../base.command";

export class GeocodeCommand extends BaseCommand {
  private useCase: GeocodeAddressUseCase;

  constructor(useCase: GeocodeAddressUseCase) {
    super("geocode", "Find a Address by Location");
    this.useCase = useCase;
  }

  private createQuestions(): PromptObject[] {
    const latQuestion: PromptObject = {
      type: "text",
      name: "lat",
      message: "Enter lantitude",
    };

    const lngQuestion: PromptObject = {
      type: "text",
      name: "lng",
      message: "Enter longitude",
    };

    return [latQuestion, lngQuestion];
  }

  protected async action(): Promise<void> {
    const response: Answers<string> = await prompts(this.createQuestions());
    const location = response as LocationDto;

    this.log.info("Geocode address...");

    try {
      const result = await this.useCase.execute(location);

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
