import { DataMapper } from "@micro/kernel/lib/infraestructure/mapper";
import { isNullOrUndefined } from "@micro/utils";

import { Country, CountryRepository } from "../../domain";
import { CountryModel } from "../database/models";

export class CountryRepositoryImpl implements CountryRepository {
  constructor(private mapper: DataMapper<Country>) {}

  async findAll(): Promise<Country[]> {
    const data = await CountryModel.findAll();

    return data.map((r) => this.mapper.toDomain(r));
  }

  async findByIso(iso: string): Promise<Country> {
    const item = await CountryModel.findOne({ where: { iso } });

    if (isNullOrUndefined(item)) {
      return {} as Country;
    }

    return this.mapper.toDomain(item);
  }

  async exists(iso: string): Promise<boolean> {
    const result = await CountryModel.findOne({ where: { iso } });

    return !!result === true;
  }

  async save(country: Country): Promise<void> {
    const exists = await this.exists(country.iso);

    if (exists) {
      await this.update(country);
    } else {
      await this.create(country);
    }
  }

  async create(country: Country): Promise<void> {
    await CountryModel.create(this.mapper.toPersistence(country));
  }

  async update(country: Country): Promise<void> {
    await CountryModel.update(this.mapper.toPersistence(country), {
      where: { iso: country.iso },
    });
  }

  async delete(iso: string): Promise<void> {
    await CountryModel.destroy({
      where: { iso },
    });
  }
}
