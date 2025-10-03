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
import { ExpenseService } from '../services/expense.service';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';
import { Expense } from '../entities/expense.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  // POST /expenses
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return this.expenseService.create(createExpenseDto);
  }

  // GET /expenses
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Expense[]> {
    return this.expenseService.findAll();
  }

  // GET /expenses/:id
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Expense> {
    return this.expenseService.findById(id);
  }

  // PUT /expenses/:id
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<Expense> {
    return this.expenseService.update(id, updateExpenseDto);
  }

  // DELETE /expenses/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.expenseService.remove(id);
  }
}
