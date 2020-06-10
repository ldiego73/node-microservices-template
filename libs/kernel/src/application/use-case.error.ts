import { DomainError } from "../domain";

export class UseCaseUnexpectedError extends DomainError {
  public constructor(error: unknown) {
    super("USE_CASE_ERROR", "An unexpected error occurred.", error);
  }

  public static create(error: unknown): UseCaseUnexpectedError {
    return new UseCaseUnexpectedError(error);
  }
}
