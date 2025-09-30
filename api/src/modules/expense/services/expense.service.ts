import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
    // Lógica de Negócios 1: Validação de dependências (Evento, se fornecido)
    if (data.evento_id) {
      await this.eventService.findById(data.evento_id).catch(() => {
        throw new NotFoundException(
          `Evento com ID ${data.evento_id} não encontrado.`,
        );
      });
      if (data.evento_id < 1)
        throw new BadRequestException('ID de Evento inválido.');
    }

    // Lógica de Negócios 2: Validação de dependências (Funcionário, se fornecido)
    if (data.employee_id) {
      await this.employeeService.findById(data.employee_id).catch(() => {
        throw new NotFoundException(
          `Funcionário com ID ${data.employee_id} não encontrado.`,
        );
      });
      if (data.employee_id < 1)
        throw new BadRequestException('ID de Funcionário inválido.');
    }

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
    if (data.evento_id) {
      if (data.evento_id < 1)
        throw new BadRequestException('ID de Evento inválido.');
    }

    // Validação de dependências (Funcionário, se alterado)
    if (data.employee_id) {
      if (data.employee_id < 1)
        throw new BadRequestException('ID de Funcionário inválido.');
    }

    return this.expenseRepository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    return this.expenseRepository.remove(id);
  }
}
