// src/group/group.controller.ts

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
  ParseIntPipe,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
import {
  CreateGroupDto,
  UpdateGroupDto,
  GroupMemberDto,
} from '../dto/group.dto';
import { Group } from '../entities/group.entity';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  // POST /groups
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  // GET /groups
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  // GET /groups/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupService.findById(id);
  }

  // PUT /groups/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return this.groupService.update(id, updateGroupDto);
  }

  // DELETE /groups/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.groupService.remove(id);
  }

  // --- Rotas de Relação M:N ---

  // POST /groups/members/add
  @Post('members/add')
  @HttpCode(HttpStatus.OK)
  async addMembers(@Body() groupMemberDto: GroupMemberDto): Promise<Group> {
    return this.groupService.addMembers(groupMemberDto);
  }

  // POST /groups/members/remove
  @Post('members/remove') // Usa POST com a semântica de remoção no body
  @HttpCode(HttpStatus.OK)
  async removeMembers(@Body() groupMemberDto: GroupMemberDto): Promise<Group> {
    return this.groupService.removeMembers(groupMemberDto);
  }

  // GET /groups/:id/members
  @Get(':id/members')
  @HttpCode(HttpStatus.OK)
  async findMembers(@Param('id', ParseIntPipe) id: number): Promise<any[]> {
    return this.groupService.findMembers(id);
  }
}
