export interface ServerOptions {
  port: number;
  logger?: boolean;
  stack?: boolean;
  https?: ServerHttpsOptions;
}

export interface ServerHttpsOptions {
  key: string;
  cert: string;
}
