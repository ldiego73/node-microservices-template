import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { FindCountryUseCase } from '@micro/country-core/lib/application/use-cases/find-country';

export class FindCountryCommand extends BaseCommand {
  private useCase: FindCountryUseCase;

  constructor(useCase: FindCountryUseCase) {
    super('find', 'Find a Country by ISO');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    console.log('Find Country!!!');
  }

  create(): Commander.Command {
    return this.command;
  }
}
