import { Repository } from "@micro/kernel/lib/infraestructure/repository";

import { Address } from "./address";

export interface AddressRepository extends Repository<Address> {
  search(country: string, address: string): Promise<Address[]>;
  geocode(lat: string, lng: string): Promise<Address[]>;
}
