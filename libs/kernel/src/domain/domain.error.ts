export abstract class DomainError {
  code: string;
  message: string;
  error?: unknown;

  constructor(code: string, message: string, error?: unknown) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
