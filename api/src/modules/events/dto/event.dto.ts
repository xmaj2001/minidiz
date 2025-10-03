import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DomainEventStatus, DomainEventType } from '../entities/event.entity';

// DTO de Criação
export class CreateEventDto {
  @IsNotEmpty({ message: 'O título do evento é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string;

  @IsNotEmpty({ message: 'A data de início é obrigatória.' })
  @IsDateString(
    {},
    {
      message: 'A data de início deve estar no formato ISO 8601 (AAAA-MM-DD).',
    },
  )
  data_inicio: string;

  @IsNotEmpty({ message: 'A data de término é obrigatória.' })
  @IsDateString(
    {},
    {
      message: 'A data de término deve estar no formato ISO 8601 (AAAA-MM-DD).',
    },
  )
  data_fim: string;

  @IsOptional()
  @IsString({ message: 'O local deve ser uma string.' })
  local?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do membro responsável deve ser um número inteiro.' },
  )
  responsavel_member_id?: number;

  @IsNotEmpty({ message: 'O tipo de evento é obrigatório.' })
  @IsEnum(DomainEventType, {
    message: `Tipo de evento inválido. Use: ${Object.values(DomainEventType).join(', ')}`,
  })
  tipo: DomainEventType;

  @IsNotEmpty({ message: 'O status do evento é obrigatório.' })
  @IsEnum(DomainEventStatus, {
    message: `Status inválido. Use: ${Object.values(DomainEventStatus).join(', ')}`,
  })
  status: DomainEventStatus;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by?: number;
}

// DTO de Atualização
export class UpdateEventDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDateString()
  data_inicio?: string;

  @IsOptional()
  @IsDateString()
  data_fim?: string;

  @IsOptional()
  @IsString()
  local?: string;

  @IsOptional()
  @IsNumber()
  responsavel_member_id?: number;

  @IsOptional()
  @IsEnum(DomainEventType)
  tipo?: DomainEventType;

  @IsOptional()
  @IsEnum(DomainEventStatus)
  status?: DomainEventStatus;
}
