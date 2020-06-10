import chalk, { Chalk } from "chalk";

import { BaseLogger, LogLevel } from "./base.logger";

export class Logger extends BaseLogger {
  protected build(
    level: LogLevel,
    message: string,
    data: unknown[]
  ): unknown[] {
    const color: Chalk = chalk.gray;
    const title: string = LogLevel[level].toUpperCase();
    let titleColor: Chalk;

    switch (level) {
      case LogLevel.Debug:
        titleColor = chalk.greenBright.bold;
        break;
      case LogLevel.Info:
        titleColor = chalk.blueBright.bold;
        break;
      case LogLevel.Warning:
        titleColor = chalk.yellowBright.bold;
        break;
      case LogLevel.Error:
        titleColor = chalk.redBright.bold;
        break;
      default:
        titleColor = chalk.whiteBright.bold;
        break;
    }

    const result: unknown[] = [];

    if (Logger.showTimestamp) result.push(color(this.timestamp()));
    result.push(titleColor(title));
    if (this.source) result.push(color(`${this.source}:`));
    result.push(message);

    return result.concat(data);
  }

  static create(name?: string): Logger {
    return new Logger(name);
  }
}
