export interface Transform<T, U> {
  toDto(t: T): U;
  toColletion?(t: T[]): U[];
}
