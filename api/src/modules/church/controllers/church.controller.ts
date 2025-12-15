import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ChurchService } from '../services/church.service';
import { ChurchCreateDto, ChurchUpdateDto } from '../dto/church.dto';

@Controller('church')
export class ChurchController {
  constructor(private readonly service: ChurchService) {}

  @Post()
  async createChurch(@Body() data: ChurchCreateDto) {
    return await this.service.create(data);
  }

  @Get()
  async getAllChurches() {
    return await this.service.findAll();
  }

  @Get(':id')
  async getChurchById(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Put(':id')
  async updateChurch(@Param('id') id: string, @Body() data: ChurchUpdateDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async deleteChurch(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
