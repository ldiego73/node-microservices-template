import { ApolloError } from "apollo-server-fastify";

import { Exception } from "./exception";

export class GraphqlException extends ApolloError {
  constructor(props: Exception) {
    super(props.message, props.code, props);
    Object.defineProperty(this, "name", { value: this.constructor.name });
  }

  public static create(props: Exception): GraphqlException {
    return new GraphqlException(props);
  }
}
