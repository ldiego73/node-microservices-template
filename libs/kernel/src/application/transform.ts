export interface Transform<T, U> {
  toDto(t: T): U;
  toCollection?(t: T[]): U[];
}
