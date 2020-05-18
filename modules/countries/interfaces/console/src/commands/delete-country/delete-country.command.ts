import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { DeleteCountryUseCase } from '@micro/country-core/lib/application/use-cases/delete-country';

export class DeleteCountryCommand extends BaseCommand {
  private useCase: DeleteCountryUseCase;

  constructor(useCase: DeleteCountryUseCase) {
    super('delete', 'Delete a Country by ISO');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    console.log('Deleted Country!!!');
  }

  create(): Commander.Command {
    return this.command;
  }
}
