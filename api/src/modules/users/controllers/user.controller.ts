// src/user/user.controller.ts

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
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, BlockUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // GET /users
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // GET /users/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findById(Number(id));
  }

  // GET /users/email/:email
  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  // PUT /users/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(Number(id), updateUserDto);
  }

  // Rota específica para BLOQUEAR um usuário (Ação administrativa)
  // PUT /users/block
  @Put('block')
  @HttpCode(HttpStatus.OK)
  async block(@Body() blockUserDto: BlockUserDto): Promise<User> {
    // Nota: Na vida real, o currentUserId viria de um token de autenticação (JWT Payload),
    // e não do Body. Mas para o DTO, isso funciona como placeholder.
    return this.userService.block(blockUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content é padrão para DELETE bem-sucedido
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.remove(Number(id));
  }
}
