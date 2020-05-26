import { Logger } from '@micro/logger';

export abstract class Service {
  protected log: Logger;

  constructor() {
    this.log = Logger.create(this.constructor.name);
  }
}
