import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateExpenseDto, UpdateExpenseDto } from '../../dto/expense.dto';
import { Expense } from '../../entities/expense.entity';
import ExpenseRepository from '../expense.repository';
import UserRespository from '../../../users/repository/user.repository';

@Injectable()
export class ExpenseImplementation implements ExpenseRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject() private readonly user: UserRespository,
  ) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    const userExists = await this.user.findById(data.created_by);
    const expense = await this.prisma.expense.create({
      data: {
        descricao: data.descricao,
        valor: data.valor,
        data: new Date(data.data),
        categoria: data.categoria,
        status: data.status,
        forma_pagamento: data.forma_pagamento,
        created_by: userExists.id,
        observacao: data.observacao || null,
      },
    });
    return expense as unknown as Expense;
  }

  async findAll(): Promise<Expense[]> {
    const expenses = await this.prisma.expense.findMany();
    return expenses as unknown as Expense[];
  }

  async findById(id: number): Promise<Expense> {
    const expense = await this.prisma.expense.findUnique({ where: { id } });
    if (!expense) throw new NotFoundException('Despesa não encontrada');
    return expense as unknown as Expense;
  }

  async update(id: number, updateDto: UpdateExpenseDto): Promise<Expense> {
    await this.findById(id);

    const expense = await this.prisma.expense.update({
      where: { id },
      data: updateDto,
    });
    return expense as unknown as Expense;
  }

  async remove(id: number): Promise<void> {
    await this.findById(id);
    await this.prisma.expense.delete({ where: { id } });
  }
}
