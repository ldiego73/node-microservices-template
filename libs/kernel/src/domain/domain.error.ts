export abstract class DomainError {
  message: string;
  error?: any;

  constructor(message: string, error?: any) {
    this.message = message;
    this.error = error;
  }
}
