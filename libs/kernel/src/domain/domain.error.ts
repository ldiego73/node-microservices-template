export abstract class DomainError {
  message: string;
  error?: unknown;

  constructor(message: string, error?: unknown) {
    this.message = message;
    this.error = error;
  }
}
