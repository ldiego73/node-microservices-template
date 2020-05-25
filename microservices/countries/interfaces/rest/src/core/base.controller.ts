import { FastifyRequest, FastifyReply } from 'fastify';
import { ServerResponse } from 'http';
import { Logger } from '@micro/logger';
import { isString } from '@micro/utils';
import { ErrorResponse } from './error.response';

export abstract class BaseController {
  protected log: Logger;
  protected req!: FastifyRequest;
  protected res!: FastifyReply<ServerResponse>;

  constructor() {
    this.log = Logger.create(this.constructor.name);
  }

  protected abstract executeImpl(): Promise<void | any>;

  public async execute(req: FastifyRequest, res: FastifyReply<ServerResponse>) {
    this.req = req;
    this.res = res;

    await this.executeImpl();
  }

  private createError(status: number, err: Error | string) {
    return this.res.code(status).send({
      status: status,
      title: isString(err) ? err : err.message,
      type: 'about:blank',
      detail: isString(err) ? '' : err.stack,
      instance: this.req.raw.url || '',
    } as ErrorResponse);
  }

  protected ok<T>(dto?: T) {
    if (dto) {
      return this.res.status(200).send(dto);
    } else {
      return this.res.status(200).send();
    }
  }

  protected created() {
    return this.res.status(201).send();
  }

  protected noContent() {
    return this.res.status(204).send();
  }

  protected bad(err: Error | string) {
    return this.createError(400, err);
  }

  protected notFound(err: Error | string) {
    return this.createError(404, err);
  }

  protected conflict(err: Error | string) {
    return this.createError(409, err);
  }

  protected unprocessableEntity(err: Error | string) {
    return this.createError(422, err);
  }

  protected fail(err: Error | string) {
    return this.createError(500, err);
  }
}
