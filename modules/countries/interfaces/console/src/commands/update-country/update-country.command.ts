import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { UpdateCountryUseCase } from '@micro/country-core/lib/application/use-cases/update-country';

export class UpdateCountryCommand extends BaseCommand {
  private useCase: UpdateCountryUseCase;

  constructor(useCase: UpdateCountryUseCase) {
    super('update', 'Update a Country');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    console.log('Update Country!!!');
  }

  create(): Commander.Command {
    return this.command;
  }
}
