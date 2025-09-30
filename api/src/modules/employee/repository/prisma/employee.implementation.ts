import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import EmployeeRepository from '../employee.repository';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../../dto/employee.dto';
import { DomainEmployeeRole, Employee } from '../../entities/employee.entity';
// Importa tipos e enums do Prisma
import {
  Employee as PrismaEmployee,
  EmployeeRole as PrismaEmployeeRole,
} from '@prisma/client';

@Injectable()
export class EmployeeImplementation implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  // --- Mapeamento de Domínio para Prisma ---

  private mapDomainRoleToPrisma(
    domainRole: DomainEmployeeRole,
  ): PrismaEmployeeRole {
    return domainRole as PrismaEmployeeRole;
  }

  // Converte o objeto do Prisma para a Entidade de Domínio
  private mapPrismaToDomain(prismaEmployee: PrismaEmployee): Employee {
    return prismaEmployee as Employee;
  }

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const employee = await this.prisma.employee.create({
      data: {
        member_id: data.member_id,
        // Mapeamento dos Enums
        cargo: this.mapDomainRoleToPrisma(data.cargo),
        // Conversão de Tipos
        data_contratacao: data.data_contratacao
          ? new Date(data.data_contratacao)
          : null,
        // Outros campos
        observacao: data.observacao || null,
      },
    });
    return this.mapPrismaToDomain(employee);
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.prisma.employee.findMany();
    return employees as Employee[];
  }

  async findById(id: number): Promise<Employee> {
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) throw new NotFoundException('Funcionário não encontrado');
    return this.mapPrismaToDomain(employee);
  }

  async findByMemberId(memberId: number): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { member_id: memberId },
    });
    if (!employee) return null;
    return this.mapPrismaToDomain(employee);
  }

  async update(id: number, updateDto: UpdateEmployeeDto): Promise<Employee> {
    await this.findById(id);

    const updateData: any = {};

    // Mapeamento condicional
    if (updateDto.cargo)
      updateData.cargo = this.mapDomainRoleToPrisma(updateDto.cargo);
    if (updateDto.data_contratacao)
      updateData.data_contratacao = new Date(updateDto.data_contratacao);

    // Campos diretos
    if (updateDto.member_id !== undefined)
      updateData.member_id = updateDto.member_id;
    if (updateDto.observacao !== undefined)
      updateData.observacao = updateDto.observacao;

    const employee = await this.prisma.employee.update({
      where: { id },
      data: updateData,
    });
    return this.mapPrismaToDomain(employee);
  }

  async remove(id: number): Promise<void> {
    // A validação de despesas ligadas a este funcionário deve ocorrer no Service.
    await this.findById(id);
    await this.prisma.employee.delete({ where: { id } });
  }
}
