export interface ServerOptions {
  port: number;
  stack?: boolean;
  https?: ServerHttpsOptions;
}

export interface ServerHttpsOptions {
  key: string;
  cert: string;
}
