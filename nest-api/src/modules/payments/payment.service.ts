import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreatePaymentDto, PaginationPayment, UpdatePaymentDto } from './payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: DatabaseService) { }

  async findAll() {
    return this.prisma.payment.findMany({
      include: { member: true },
    });
  }

  async getPage(data: PaginationPayment) {
    if (!data)
      return
    const salto = (data.page - 1) * data.numberItens;
    const result = await this.prisma.payment.findMany({
      skip: salto,
      take: data.numberItens,
      orderBy: { createdAt: 'desc' }
    });
    const totalItem = await this.prisma.payment.count()
    return {
      data: result,
      meta: {
        page: data.page,
        numPage: Math.ceil(totalItem / data.numberItens),
        total: totalItem
      }
    }
  }

  async findOne(id: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { member: true },
    });
    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    return payment;
  }

  async findHistory(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    return this.prisma.paymentLog.findMany({
      where: { paymentId: id },
      include: { changedBy: true },
      orderBy: { changedAt: 'desc' },
    });
  }

  async create(dto: CreatePaymentDto) {
    return this.prisma.payment.create({
      data: {
        memberId: dto.memberId,
        type: dto.type,
        amount: dto.amount,
        date: new Date(dto.date),
        description: dto.description,
      },
    });
  }

  async update(id: number, dto: UpdatePaymentDto, userId: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    if (dto.amount && dto.amount !== payment.amount) {
      await this.prisma.paymentLog.create({
        data: {
          paymentId: id,
          oldAmount: payment.amount,
          newAmount: dto.amount,
          changedById: userId,
          description: dto.description || 'Alteração de pagamento',
        },
      });
    }

    return this.prisma.payment.update({
      where: { id },
      data: {
        amount: dto.amount,
        description: dto.description,
      },
    });
  }

  async delete(id: number) {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }
    await this.prisma.payment.delete({ where: { id } });
    return true;
  }
}