import { Controller, Put, Body } from '@nestjs/common';
import { UpdateService } from './update.service';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';

@Controller()
export class UpdateController {
  constructor(private readonly service: UpdateService) {}

  @Put()
  async update(@Body() country: CountryDto): Promise<any> {
    return await this.service.execute(country);
  }
}
