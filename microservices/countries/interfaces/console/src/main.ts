import { program } from 'commander';
import {
  listCommand,
  findCommand,
  createCommand,
  updateCommand,
  deleteCommand,
} from './commands';

program
  .description('Country Console Interface')
  .addCommand(listCommand)
  .addCommand(findCommand)
  .addCommand(createCommand)
  .addCommand(updateCommand)
  .addCommand(deleteCommand)
  .parse(process.argv);
