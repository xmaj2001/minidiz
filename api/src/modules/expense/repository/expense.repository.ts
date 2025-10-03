import { CreateExpenseDto, UpdateExpenseDto } from '../dto/expense.dto';
import { Expense } from '../entities/expense.entity';

export default abstract class ExpenseRepository {
  abstract create(data: CreateExpenseDto): Promise<Expense>;
  abstract findAll(): Promise<Expense[]>;
  abstract findById(id: number): Promise<Expense>;
  abstract update(id: number, data: UpdateExpenseDto): Promise<Expense>;
  abstract remove(id: number): Promise<void>;
}
