import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import {
  ExpenseCategory,
  ExpenseStatus,
  PaymentMethod,
} from '../entities/expense.entity';

export class CreateExpenseDto {
  @IsNotEmpty({ message: 'A descrição da despesa é obrigatória.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @IsNotEmpty({ message: 'O valor da despesa é obrigatório.' })
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor: number;

  @IsNotEmpty({ message: 'A data da despesa é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data deve estar no formato ISO 8601 (AAAA-MM-DD).' },
  )
  data: string;

  @IsNotEmpty({ message: 'A categoria da despesa é obrigatória.' })
  @IsEnum(ExpenseCategory, {
    message: `Categoria inválida. Use: ${Object.values(ExpenseCategory).join(', ')}`,
  })
  categoria: ExpenseCategory;

  @IsNotEmpty({ message: 'A estatus da despesa é obrigatória.' })
  @IsEnum(ExpenseStatus, {
    message: `Status inválida. Use: ${Object.values(ExpenseStatus).join(', ')}`,
  })
  status: ExpenseStatus;

  @IsNotEmpty({ message: 'A forma de pagamento da despesa é obrigatória.' })
  @IsEnum(PaymentMethod, {
    message: `Forma de pagamento inválido. Use: ${Object.values(PaymentMethod).join(', ')}`,
  })
  forma_pagamento: PaymentMethod;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;

  @IsNotEmpty({ message: 'O ID do usuário que registrou é obrigatório.' })
  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by: number;
}

// DTO de Atualização (Todos os campos são opcionais)
export class UpdateExpenseDto {
  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string;

  @IsOptional()
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor?: number;

  @IsOptional()
  @IsDateString({}, { message: 'A data deve estar no formato ISO 8601.' })
  data?: string;

  @IsNotEmpty({ message: 'A categoria da despesa é obrigatória.' })
  @IsEnum(ExpenseCategory, {
    message: `Categoria inválida. Use: ${Object.values(ExpenseCategory).join(', ')}`,
  })
  categoria: ExpenseCategory;

  @IsNotEmpty({ message: 'A estatus da despesa é obrigatória.' })
  @IsEnum(ExpenseStatus, {
    message: `Status inválida. Use: ${Object.values(ExpenseStatus).join(', ')}`,
  })
  status: ExpenseStatus;

  @IsNotEmpty({ message: 'A forma de pagamento da despesa é obrigatória.' })
  @IsEnum(PaymentMethod, {
    message: `Forma de pagamento inválido. Use: ${Object.values(PaymentMethod).join(', ')}`,
  })
  forma_pagamento: PaymentMethod;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;
}
