import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto, UpdatePaymentDto, CreatePaymentSchema, UpdatePaymentSchema, PaginationPaymentSchema, PaginationPayment } from './payment.dto';
import { ZodValidationPipe } from '../../common/decorators/validate.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get()
  @HttpCode(200)
  async findAll(@Body(new ZodValidationPipe(PaginationPaymentSchema)) data: PaginationPayment) {
    if (data) {
      const result = await this.paymentService.getPage(data);
      return { data: result, message: 'Pagamentos paginados com sucesso' };
    }
    const payments = await this.paymentService.findAll();
    return { data: payments, message: 'Pagamentos listados com sucesso' };
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const payment = await this.paymentService.findOne(+id);
    return { data: payment, message: 'Pagamento encontrado' };
  }

  @Get(':id/history')
  @HttpCode(200)
  async findHistory(@Param('id') id: string) {
    const history = await this.paymentService.findHistory(+id);
    return { data: history, message: 'Histórico recuperado com sucesso' };
  }

  @Post()
  @HttpCode(201)
  async create(@Body(new ZodValidationPipe(CreatePaymentSchema)) dto: CreatePaymentDto) {
    const payment = await this.paymentService.create(dto);
    return { data: payment, message: 'Pagamento criado com sucesso' };
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdatePaymentSchema)) dto: UpdatePaymentDto,
  ) {
    const payment = await this.paymentService.update(+id, dto, 1); // userId fixo para exemplo
    return { data: payment, message: 'Pagamento atualizado com sucesso' };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.paymentService.delete(+id);
    return; // Status 204 não retorna corpo
  }
}