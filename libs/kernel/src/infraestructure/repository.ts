export interface Repository<T> {
  findAll(): Promise<T[]>;

  save(t: T): Promise<void>;
  create(t: T): Promise<void>;
  update(t: T): Promise<void>;
}
