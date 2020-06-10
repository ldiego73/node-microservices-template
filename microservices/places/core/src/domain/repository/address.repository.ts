import { Address } from "../address";

export interface AddressRepository {
  search(country: string, address: string): Promise<Address[]>;
  geocode(lat: string, lng: string): Promise<Address[]>;
}
