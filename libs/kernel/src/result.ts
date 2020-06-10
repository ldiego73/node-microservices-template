export type Either<L, A> = Failure<L, A> | Success<L, A>;

export class Failure<L, A = any> {
  readonly error: L;

  constructor(error: L) {
    this.error = error;
  }

  get value(): A {
    throw new Error("Unable to retrieve value from failed result");
  }

  isFailure(): this is Failure<L, A> {
    return true;
  }

  isSuccess(): this is Success<L, A> {
    return false;
  }
}

export class Success<L, A> {
  private readonly _value?: A;

  constructor(value?: A) {
    this._value = value;
  }

  get value(): A {
    return this._value as A;
  }

  isFailure(): this is Failure<L, A> {
    return false;
  }

  isSuccess(): this is Success<L, A> {
    return true;
  }
}

export class Result {
  public static fail<L, A>(l: L): Either<L, A> {
    return new Failure(l);
  }

  public static ok<L, A>(a?: A): Either<L, A> {
    return new Success(a);
  }

  public static combine<L, A>(results: Either<L, A>[]): Either<L, A> {
    for (const result of results) {
      if (result.isFailure()) return result;
    }

    return Result.ok();
  }
}
