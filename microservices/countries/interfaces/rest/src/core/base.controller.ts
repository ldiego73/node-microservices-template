import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { Logger } from '@micro/logger';

export abstract class BaseController<T> {
  protected logger: Logger;

  constructor() {
    this.logger = Logger.create(this.constructor.name);
  }

  abstract execute(
    request: FastifyRequest,
    reply: FastifyReply<ServerResponse>
  ): Promise<T>;
}
