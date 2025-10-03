// src/employee/employee.controller.ts

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
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { Employee } from '../entities/employee.entity';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // POST /employees
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  // GET /employees
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  // GET /employees/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeeService.findById(id);
  }

  // GET /employees/member/:memberId (Endpoint para buscar pelo ID do Membro)
  @Get('member/:memberId')
  @HttpCode(HttpStatus.OK)
  async findByMemberId(
    @Param('memberId', ParseIntPipe) memberId: number,
  ): Promise<Employee> {
    return this.employeeService.findByMemberId(memberId);
  }

  // PUT /employees/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  // DELETE /employees/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.employeeService.remove(id);
  }
}
