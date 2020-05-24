import { BaseCommand } from '../base.command';
import * as Commander from 'commander';
import { FindCountryUseCase } from '@micro/country-core/lib/application/use-cases/find-country';
import { IsoDto } from '@micro/country-core/lib/application/dtos';
import prompts from 'prompts';

export class FindCountryCommand extends BaseCommand {
  private useCase: FindCountryUseCase;

  constructor(useCase: FindCountryUseCase) {
    super('find', 'Find a Country by ISO');
    this.useCase = useCase;
  }

  protected async action(): Promise<void> {
    const response = await prompts({
      type: 'text',
      name: 'iso',
      message: 'Enter country iso',
    });

    this.log.info('Filtering country...');

    try {
      const dto: IsoDto = {
        iso: response.iso,
      };
      const result = await this.useCase.execute(dto);

      if (result.isFailure()) {
        const { error } = result;

        this.log.error('Country', error.message);
      } else {
        this.log.info('Country', result.value);
      }
    } catch (err) {
      this.log.error('Country', err);
    }
  }

  create(): Commander.Command {
    return this.command;
  }
}
