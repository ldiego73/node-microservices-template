import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { DeleteCountryUseCase } from '@micro/country-core/lib/application/use-cases/delete-country';
import prompts from 'prompts';
import { IsoDto } from '@micro/country-core';

export class DeleteCountryCommand extends BaseCommand {
  private useCase: DeleteCountryUseCase;

  constructor(useCase: DeleteCountryUseCase) {
    super('delete', 'Delete a Country by ISO');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    const response = await prompts({
      type: 'text',
      name: 'iso',
      message: 'Enter country iso',
    });

    try {
      const dto: IsoDto = {
        iso: response.iso,
      };
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error('Country', error.message);
      } else {
        this.log.info('Deleted country!!!');
      }
    } catch (err) {
      this.log.error('Country', err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
