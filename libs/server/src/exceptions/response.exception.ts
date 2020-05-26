export interface Exception {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
  path?: string;
}

export abstract class ResponseException {
  status: number;
  code: string;
  message: string;
  timestamp: string;

  constructor(status: number, message: string, code?: string) {
    this.status = status;
    this.message = message;
    this.code = code || this.constructor.name;
    this.timestamp = new Date().toISOString();
  }
}
