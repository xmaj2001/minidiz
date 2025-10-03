import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';
import { DomainExpenseCategory } from '../entities/expense.entity';

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
  @IsEnum(DomainExpenseCategory, {
    message: `Categoria inválida. Use: ${Object.values(DomainExpenseCategory).join(', ')}`,
  })
  categoria: DomainExpenseCategory;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do evento deve ser um número inteiro, se aplicável.' },
  )
  evento_id?: number;

  @IsOptional()
  @IsNumber(
    {},
    {
      message:
        'O ID do funcionário associado deve ser um número inteiro, se aplicável.',
    },
  )
  employee_id?: number;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by?: number;
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

  @IsOptional()
  @IsEnum(DomainExpenseCategory, { message: `Categoria inválida.` })
  categoria?: DomainExpenseCategory;

  @IsOptional()
  @IsNumber({}, { message: 'O ID do evento deve ser um número inteiro.' })
  evento_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O ID do funcionário deve ser um número inteiro.' })
  employee_id?: number;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;
}
