import { Logger } from "@micro/logger";

export abstract class BaseService {
  protected log: Logger;

  constructor() {
    this.log = Logger.create(this.constructor.name);
  }
}
