import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MemberService } from '../services/member.service';
import { CreateMemberDto, UpdateMemberDto } from '../dto/member.dto';
import { Member } from '../entities/member.entity';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // POST /members
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberService.create(createMemberDto);
  }

  // GET /members
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }

  // GET /members/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  // ParseIntPipe garante que o ':id' da URL seja um número
  async findOne(@Param('id') id: number): Promise<Member> {
    return this.memberService.findById(id);
  }

  // PUT /members/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return this.memberService.update(id, updateMemberDto);
  }

  // DELETE /members/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.memberService.remove(id);
  }
}
