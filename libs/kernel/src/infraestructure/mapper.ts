export interface DataMapper<T> {
  toDomain(raw: any): T;
  toPersistence(t: T): any;
}
