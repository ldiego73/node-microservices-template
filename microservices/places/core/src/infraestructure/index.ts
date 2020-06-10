import { AddressMapper } from "./mappers";
import { AddressRepositoryImpl } from "./repository";
import { SearchService } from "./services";

const mapper = new AddressMapper();
const service = new SearchService();
const addressRepository = new AddressRepositoryImpl(service, mapper);

export { addressRepository };
