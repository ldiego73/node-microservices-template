import { BaseLogger, LogLevel } from './base.logger';

export class Logger extends BaseLogger {
  protected build(level: LogLevel, message: string, data: any[]): any[] {
    let background: string;
    let title: string = LogLevel[level].toUpperCase();

    switch (level) {
      case LogLevel.Debug:
        background = '#A8CC8C';
        break;
      case LogLevel.Info:
        background = '#71BEF2';
        break;
      case LogLevel.Warning:
        background = '#DBAB79';
        break;
      case LogLevel.Error:
        background = '#E88388';
        break;
      default:
        background = '#B9BFCA';
        break;
    }

    const result: any[] = [];
    const printTime = Logger.showTimestamp ? `${this.timestamp()} ` : '';

    result.push(`${printTime}%c${title}`);
    result.push(
      `background: ${background}; color: #000; padding: 2px 0.5em; border-radius: 0.5em;`
    );
    if (this.source) result.push(`${this.source}:`);
    result.push(message);

    return result;
  }

  static create(name?: string) {
    return new Logger(name);
  }
}
