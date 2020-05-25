import { Controller, Get, Body, Post } from '@nestjs/common';
import { CreateService } from './create.service';
import { CountryDto } from '@micro/countries-core/lib/application/dtos';

@Controller()
export class CreateController {
  constructor(private readonly service: CreateService) {}

  @Post()
  async findAll(@Body() country: CountryDto): Promise<any> {
    return await this.service.execute(country);
  }
}
