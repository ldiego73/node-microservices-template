import { LogLevel } from "../src/base.logger";
import { Logger } from "../src/logger";

describe("Logger", () => {
  beforeEach(() => {
    Logger.level = LogLevel.Log;
    Logger.showTimestamp = true;
  });

  it("should create an instance", () => {
    expect(new Logger()).toBeTruthy();
  });

  it("should add a new LogOutput and receives log entries", () => {
    const log = Logger.create("test");
    const spy = jest.fn();

    Logger.outputs.push(spy);

    log.log("l");
    log.debug("d");
    log.info("i");
    log.warn("w");
    log.error("e", { error: true });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(5);
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Log, "l");
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Debug, "d");
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Info, "i");
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Warning, "w");
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Error, "e", {
      error: true,
    });
  });

  it("should whithout timestamp", () => {
    const log = Logger.create("test");
    const spy = jest.fn();

    Logger.showTimestamp = false;
    Logger.outputs.push(spy);

    log.log("l");
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Log, "l");
  });

  it("should whithout source", () => {
    const log = Logger.create();
    const spy = jest.fn();

    Logger.outputs.push(spy);

    log.log("l");
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(undefined, LogLevel.Log, "l");
  });

  it("should add a new LogOutput and receives only production log entries", () => {
    const log = Logger.create("test");
    const spy = jest.fn();

    Logger.outputs.push(spy);
    Logger.enableProductionMode();

    log.debug("d");
    log.info("i");
    log.warn("w");
    log.error("e", { error: true });

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Warning, "w");
    expect(spy).toHaveBeenCalledWith("TEST", LogLevel.Error, "e", {
      error: true,
    });
  });
});
