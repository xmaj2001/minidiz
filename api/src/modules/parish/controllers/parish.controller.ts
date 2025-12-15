import { ParishCreateDto, ParishUpdateDto } from '../dto/parish.dto';
import { ParishService } from '../services/parish.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('parish')
export class ParishController {
  constructor(private readonly service: ParishService) {}

  @Post()
  async create(@Body() data: ParishCreateDto) {
    return await this.service.create(data);
  }

  @Get()
  async getAlles() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ParishUpdateDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
