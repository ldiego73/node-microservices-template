import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { ListCountryUseCase } from '@micro/country-core/lib/application/use-cases/list-country';

export class ListCountryCommand extends BaseCommand {
  private useCase: ListCountryUseCase;

  constructor(useCase: ListCountryUseCase) {
    super('list', 'List a Country by ISO');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    console.log('List Country!!!');
  }

  create(): Commander.Command {
    return this.command;
  }
}
