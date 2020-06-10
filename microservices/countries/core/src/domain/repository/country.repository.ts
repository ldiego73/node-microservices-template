import { Country } from "../country";

export interface CountryRepository {
  findAll(): Promise<Country[]>;
  findByIso(iso: string): Promise<Country>;
  exists(iso: string): Promise<boolean>;
  save(country: Country): Promise<void>;
  create(country: Country): Promise<void>;
  update(country: Country): Promise<void>;
  delete(iso: string): Promise<void>;
}
