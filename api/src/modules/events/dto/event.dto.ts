import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { EventStatus, EventType } from '../entities/event.entity';

// DTO para criação de evento
export class CreateEventDto {
  @IsNotEmpty({ message: 'O título do evento é obrigatório.' })
  @IsString({ message: 'O título deve ser uma string.' })
  nome: string;

  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @IsNotEmpty({ message: 'A data é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data deve estar no formato ISO 8601 (AAAA-MM-DD).' },
  )
  data: string;

  @IsNotEmpty({ message: 'O horário é obrigatório.' })
  @IsString({ message: 'O horário deve ser uma string.' })
  horaio: string;

  @IsOptional()
  @IsString({ message: 'O local deve ser uma string.' })
  local?: string | null;

  @IsNotEmpty({ message: 'O orçamento é obrigatório.' })
  @IsNumber({}, { message: 'O orçamento deve ser um número.' })
  orcamento: number;

  @IsOptional()
  @IsString({ message: 'As observações devem ser uma string.' })
  observacoes?: string | null;

  @IsNotEmpty({ message: 'O tipo de evento é obrigatório.' })
  @IsEnum(EventType, {
    message: `Tipo de evento inválido. Use: ${Object.values(EventType).join(', ')}`,
  })
  tipo: EventType;

  @IsNotEmpty({ message: 'O status do evento é obrigatório.' })
  @IsEnum(EventStatus, {
    message: `Status inválido. Use: ${Object.values(EventStatus).join(', ')}`,
  })
  status: EventStatus;

  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by: number;
}

// DTO para atualização de evento (todos opcionais)
export class UpdateEventDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @IsString()
  horaio?: string;

  @IsOptional()
  @IsString()
  local?: string | null;

  @IsOptional()
  @IsNumber()
  orcamento?: number;

  @IsOptional()
  @IsString()
  observacoes?: string | null;

  @IsOptional()
  @IsEnum(EventType)
  tipo?: EventType;

  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;
}

// DTO completo (representação do recurso)
export class EventDto {
  id: number;
  nome: string;
  descricao: string | null;
  data: string; // ISO date
  horaio: string;
  local: string | null;
  orcamento: number;
  observacoes: string | null;
  tipo: EventType;
  status: EventStatus;
  created_by: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}
