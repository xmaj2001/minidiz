import { Injectable } from '@nestjs/common';
import ExpenseRepository from '../repository/expense.repository';
import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';
import { Expense } from '../entities/expense.entity';
import { EventService } from '../../events/services/event.service';
import { EmployeeService } from '../../employee/services/employee.service';

@Injectable()
export class ExpenseService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly employeeService: EmployeeService, // Para validar o funcionário
    private readonly eventService: EventService, // Para validar o evento
  ) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    return this.expenseRepository.create(data);
  }

  async findAll(): Promise<Expense[]> {
    return this.expenseRepository.findAll();
  }

  async findById(id: number): Promise<Expense> {
    return this.expenseRepository.findById(id);
  }

  async update(id: number, data: UpdateExpenseDto): Promise<Expense> {
    // Validação de dependências (Evento, se alterado)
    return this.expenseRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    return this.expenseRepository.remove(id);
  }
}
