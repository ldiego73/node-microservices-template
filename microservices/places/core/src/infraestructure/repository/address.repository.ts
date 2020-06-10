/* eslint-disable @typescript-eslint/no-unused-vars */

import { DataMapper } from "@micro/kernel/lib/infraestructure/mapper";

import { Address } from "../../domain/address";
import { AddressRepository } from "../../domain/repository";
import { SearchService } from "../services/search.service";

export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    private service: SearchService,
    private mapper: DataMapper<Address>
  ) {}
  async search(country: string, address: string): Promise<Address[]> {
    const data = await this.service.search(country, address);

    return data.map((r) => this.mapper.toDomain(r));
  }

  async geocode(lat: string, lng: string): Promise<Address[]> {
    const data = await this.service.geocode(lat, lng);

    return data.map((r) => this.mapper.toDomain(r));
  }
}
