import { CountryDataMapper } from "./mappers";
import { CountryRepositoryImpl } from "./repository";

const mapper = new CountryDataMapper();
const countryRepository = new CountryRepositoryImpl(mapper);

export { countryRepository };
