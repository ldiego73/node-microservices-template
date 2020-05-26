import { Logger } from '@micro/logger';

export abstract class Controller {
  protected log: Logger;

  constructor() {
    this.log = Logger.create(this.constructor.name);
  }
}
