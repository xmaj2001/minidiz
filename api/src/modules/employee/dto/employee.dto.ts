// src/employee/dto/employee.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DomainEmployeeRole } from '../entities/employee.entity';

export class CreateEmployeeDto {
  @IsNotEmpty({
    message:
      'O ID do membro que será designado como funcionário é obrigatório.',
  })
  @IsNumber({}, { message: 'O ID do membro deve ser um número inteiro.' })
  member_id: number;

  @IsNotEmpty({ message: 'O cargo do funcionário é obrigatório.' })
  @IsEnum(DomainEmployeeRole, {
    message: `Cargo inválido. Use: ${Object.values(DomainEmployeeRole).join(', ')}`,
  })
  cargo: DomainEmployeeRole;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'A data de contratação deve estar no formato ISO 8601 (AAAA-MM-DD).',
    },
  )
  data_contratacao?: string;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;
}

// DTO de Atualização (Todos os campos são opcionais)
export class UpdateEmployeeDto {
  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do membro associado deve ser um número inteiro.' },
  )
  member_id?: number;

  @IsOptional()
  @IsEnum(DomainEmployeeRole, { message: `Cargo inválido.` })
  cargo?: DomainEmployeeRole;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de contratação deve estar no formato ISO 8601.' },
  )
  data_contratacao?: string;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;
}
