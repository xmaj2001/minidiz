import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { MemberCreateDto, MemberUpdateDto } from '../dto/memer.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly service: MemberService) {}

  @Post()
  @HttpCode(200)
  async create(@Body() data: MemberCreateDto) {
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

  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    return await this.service.findByEmail(email);
  }

  @Get('phone/:phone')
  async getByPhone(@Param('phone') phone: string) {
    return await this.service.findByPhone(phone);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: MemberUpdateDto) {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
