import { Catch, ArgumentsHost } from '@nestjs/common';
import {
  GqlExceptionFilter,
  GqlArgumentsHost,
  GqlContextType,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { BaseExceptionFilter, Response } from './base.exception.filter';
import { GraphqlException } from '../exceptions';

@Catch()
export class GraphQlExceptionFilter extends BaseExceptionFilter
  implements GqlExceptionFilter {
  constructor() {
    super();
  }

  catch(exception: Response, host: ArgumentsHost): any {
    const gqlHost = GqlArgumentsHost.create(host);
    const ctx = gqlHost.getType<GqlContextType>();

    if (ctx === 'graphql') {
      const info = gqlHost.getInfo<GraphQLResolveInfo>();
      const fieldName = info.fieldName;
      const parentType = info.parentType.name;

      const path = `${parentType} => ${fieldName}`;
      const result = this.createException(exception, path);

      return GraphqlException.create(result);
    }

    return exception;
  }
}
