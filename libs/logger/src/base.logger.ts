import dateFormat from "dateformat";

export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
  Log,
}

export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  message: string,
  ...data: any[]
) => void;

export abstract class BaseLogger {
  static level = LogLevel.Log;
  static outputs: LogOutput[] = [];
  static showTimestamp = true;

  static enableProductionMode(): void {
    BaseLogger.level = LogLevel.Warning;
  }

  constructor(protected source?: string) {
    if (source) this.source = source.toUpperCase();
  }

  log(message: string, ...data: any[]): void {
    this.doLog(console.log, LogLevel.Log, message, data);
  }

  debug(message: string, ...data: any[]): void {
    this.doLog(console.debug, LogLevel.Debug, message, data);
  }

  info(message: string, ...data: any[]): void {
    this.doLog(console.info, LogLevel.Info, message, data);
  }

  warn(message: string, ...data: any[]): void {
    this.doLog(console.warn, LogLevel.Warning, message, data);
  }

  error(message: string, ...data: any[]): void {
    this.doLog(console.error, LogLevel.Error, message, data);
  }

  protected timestamp(): string {
    return `[${dateFormat(new Date(), dateFormat.masks.isoDateTime)}]`;
  }

  private doLog(
    func: (...args: any[]) => void,
    level: LogLevel,
    message: string,
    data: any[]
  ) {
    if (level > BaseLogger.level) {
      return;
    }

    const log = this.build(level, message, data);

    func.apply(console, log);

    this.applyLoggerOutpus(level, message, data);
  }

  protected abstract build(
    level: LogLevel,
    message: string,
    data: any[]
  ): any[];

  private applyLoggerOutpus(level: LogLevel, message: string, data: any[]) {
    BaseLogger.outputs.forEach((output) => {
      output.apply(output, [this.source, level, message, ...data]);
    });
  }
}
