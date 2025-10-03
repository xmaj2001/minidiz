// src/expense/repository/expense.implementation.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import ExpenseRepository from '../expense.repository';
import { CreateExpenseDto, UpdateExpenseDto } from '../../dto/expense.dto';
import { DomainExpenseCategory, Expense } from '../../entities/expense.entity';
// Importa tipos e enums do Prisma
import {
  Expense as PrismaExpense,
  ExpenseCategory as PrismaExpenseCategory,
} from '@prisma/client';

@Injectable()
export class ExpenseImplementation implements ExpenseRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapDomainCategoryToPrisma(
    domainCategory: DomainExpenseCategory,
  ): PrismaExpenseCategory {
    return domainCategory as PrismaExpenseCategory;
  }

  // Converte o objeto do Prisma para a Entidade de Domínio
  private mapPrismaToDomain(prismaExpense: PrismaExpense): Expense {
    return prismaExpense as unknown as Expense;
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    const expense = await this.prisma.expense.create({
      data: {
        // IDs:
        evento_id: data.evento_id || null,
        employee_id: data.employee_id || null,
        created_by: data.created_by || null,

        // Mapeamento dos Enums
        categoria: this.mapDomainCategoryToPrisma(data.categoria),

        // Conversão de Tipos
        valor: data.valor, // Prisma aceita number ou string para Decimal
        data: new Date(data.data),

        // Outros campos
        descricao: data.descricao,
        observacao: data.observacao || null,
      },
    });
    return this.mapPrismaToDomain(expense);
  }

  async findAll(): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany();
    return expenses as unknown as Expense[];
  }

  async findById(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException('Despesa não encontrada');
    return this.mapPrismaToDomain(expense);
  }

  async update(id: number, updateDto: UpdateExpenseDto): Promise<Expense> {
    // Verifica se existe (lança NotFoundException se não)
    await this.findById(id);

    const updateData: any = {};

    // Mapeamento condicional
    if (updateDto.categoria)
      updateData.categoria = this.mapDomainCategoryToPrisma(
        updateDto.categoria,
      );
    if (updateDto.data) updateData.data = new Date(updateDto.data);

    // Campos diretos
    if (updateDto.descricao) updateData.descricao = updateDto.descricao;
    if (updateDto.valor !== undefined) updateData.valor = updateDto.valor; // Passado como number/string para o Decimal
    if (updateDto.evento_id !== undefined)
      updateData.evento_id = updateDto.evento_id;
    if (updateDto.employee_id !== undefined)
      updateData.employee_id = updateDto.employee_id;
    if (updateDto.observacao !== undefined)
      updateData.observacao = updateDto.observacao;

    const expense = await this.prisma.expense.update({
      where: { id },
      data: updateData as PrismaExpense,
    });
    return this.mapPrismaToDomain(expense);
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.expense.delete({ where: { id } });
  }
}
