import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import prompts, { PromptObject, Answers } from 'prompts';
import { CountryDto, createCountryUseCase } from '@micro/country-core';
import { CreateCountryUseCase } from '@micro/country-core/lib/application/use-cases/create-country';

export class CreateCountryCommand extends BaseCommand {
  private useCase: CreateCountryUseCase;

  constructor(useCase: CreateCountryUseCase) {
    super('create', 'Create a Country');
    this.useCase = useCase;
  }

  private createQuestions(): PromptObject[] {
    const nameQuestion: PromptObject = {
      type: 'text',
      name: 'name',
      message: 'Enter country name',
    };

    const isoQuestion: PromptObject = {
      type: 'text',
      name: 'iso',
      message: 'Enter country iso',
    };

    const currencyQuestion: PromptObject = {
      type: 'text',
      name: 'currency',
      message: 'Enter country currency',
    };

    const statusQuestion: PromptObject = {
      type: 'text',
      name: 'confirm',
      message: 'Enter country status',
      initial: true,
    };

    return [nameQuestion, isoQuestion, currencyQuestion, statusQuestion];
  }

  protected async action(): Promise<void> {
    const response: Answers<string> = await prompts(this.createQuestions());
    const country = response as CountryDto;

    createCountryUseCase.execute(country);

    console.log(country);
  }

  create(): Commander.Command {
    return this.command;
  }
}
