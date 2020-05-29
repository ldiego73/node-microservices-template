/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddressRepository } from '../../domain/repository';
import { Address } from '../../domain/address';
import { SearchService } from '../services/search.service';
import { Mapper } from '@micro/kernel/lib/infraestructure/mapper';
import { AddressMapper } from '../mappers/address.mapper';

export class AddressRepositoryImpl implements AddressRepository {
  private service: SearchService;
  private mapper: Mapper<Address>;

  constructor() {
    this.service = new SearchService();
    this.mapper = new AddressMapper();
  }
  async search(country: string, address: string): Promise<Address[]> {
    const data = await this.service.search(country, address);

    return data.map((r) => this.mapper.toDomain(r));
  }

  async geocode(lat: string, lng: string): Promise<Address[]> {
    const data = await this.service.geocode(lat, lng);

    return data.map((r) => this.mapper.toDomain(r));
  }

  async findAll(): Promise<Address[]> {
    throw new Error('Not implemented');
  }

  async save(address: Address): Promise<void> {
    throw new Error('Not implemented');
  }

  async create(address: Address): Promise<void> {
    throw new Error('Not implemented');
  }

  async update(address: Address): Promise<void> {
    throw new Error('Not implemented');
  }
}
