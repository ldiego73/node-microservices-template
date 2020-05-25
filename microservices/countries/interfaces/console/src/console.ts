import { program } from 'commander';
import pkg from '../package.json';
import {
  listCommand,
  findCommand,
  createCommand,
  updateCommand,
  deleteCommand,
} from './commands';

program
  .version(pkg.version)
  .description('Country Console Interface')
  .addCommand(listCommand)
  .addCommand(findCommand)
  .addCommand(createCommand)
  .addCommand(updateCommand)
  .addCommand(deleteCommand)
  .parse(process.argv);
