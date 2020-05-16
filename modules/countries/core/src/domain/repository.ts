import { Country } from './country';
import { Repository } from '@micro/kernel/lib/infraestructure';

export interface CountryRepository extends Repository<Country> {
  findByIso(iso: string): Promise<Country>;
  exists(iso: string): Promise<boolean>;

  delete(iso: string): Promise<void>;
}
