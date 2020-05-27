export abstract class MicroApplication {
  abstract start(): Promise<void> | void;
}
