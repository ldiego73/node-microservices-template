import { Repository } from '@micro/kernel/lib/infraestructure/repository';
import { Country } from './country';

export interface CountryRepository extends Repository<Country> {
  findByIso(iso: string): Promise<Country>;
  exists(iso: string): Promise<boolean>;

  delete(iso: string): Promise<void>;
}
