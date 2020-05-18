import { program } from 'commander';
import pkg from '../package.json';
import {
  listCountryCommand,
  findCountryCommand,
  createCountryCommand,
  updateCountryCommand,
  deleteCountryCommand,
} from './commands';

program
  .version(pkg.version)
  .description('Country Console Interface')
  .addCommand(listCountryCommand)
  .addCommand(findCountryCommand)
  .addCommand(createCountryCommand)
  .addCommand(updateCountryCommand)
  .addCommand(deleteCountryCommand)
  .parse(process.argv);
