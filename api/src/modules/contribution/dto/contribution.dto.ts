// src/contribution/dto/contribution.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  // IsNumberString,
  // ArrayMaxSize,
  IsArray,
  // ArrayMinSize,
  Min,
} from 'class-validator';
import {
  DomainContributionStatus,
  DomainContributionType,
  DomainPaymentMethod,
} from '../entities/contribution.entity';

// DTO de Criação
export class CreateContributionDto {
  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do evento deve ser um número inteiro, se aplicável.' },
  )
  evento_id?: number;

  @IsNotEmpty({ message: 'O ID do membro contribuinte é obrigatório.' })
  @IsNumber({}, { message: 'O ID do membro deve ser um número inteiro.' })
  member_id: number;

  @IsNotEmpty({ message: 'O tipo de contribuição é obrigatório.' })
  @IsEnum(DomainContributionType, {
    message: `Tipo de contribuição inválido. Use: ${Object.values(DomainContributionType).join(', ')}`,
  })
  tipo: DomainContributionType;

  @IsNotEmpty({ message: 'O valor da contribuição é obrigatório.' })
  // Aceita string ou número e garante que seja um valor numérico positivo.
  @IsNumber(
    {},
    {
      message:
        'O valor deve ser um número. Use string para alta precisão, se necessário.',
    },
  )
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor: number;

  @IsNotEmpty({ message: 'A data da contribuição é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data deve estar no formato ISO 8601 (AAAA-MM-DD).' },
  )
  data: string;

  @IsNotEmpty({ message: 'O método de pagamento é obrigatório.' })
  @IsEnum(DomainPaymentMethod, {
    message: `Método de pagamento inválido. Use: ${Object.values(DomainPaymentMethod).join(', ')}`,
  })
  metodo: DomainPaymentMethod;

  @IsOptional()
  @IsString({ message: 'A finalidade deve ser uma string.' })
  finalidade?: string;

  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;

  @IsOptional()
  @IsString({
    message: 'A descrição do bem (se aplicável) deve ser uma string.',
  })
  descricao?: string;

  @IsOptional()
  // Array de strings para URLs de imagens
  @IsArray({ message: 'Imagens deve ser um array de URLs.' })
  @IsString({
    each: true,
    message: 'Cada item em imagens deve ser uma string de URL.',
  })
  imagens?: string[];

  @IsOptional()
  @IsEnum(DomainContributionStatus, {
    message: `Status inválido. Use: ${Object.values(DomainContributionStatus).join(', ')}`,
  })
  status?: DomainContributionStatus;

  @IsOptional()
  @IsString({ message: 'O tipo do objeto deve ser uma string.' })
  tipoObjeto?: string;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by?: number;
}

// DTO de Atualização
export class UpdateContributionDto {
  @IsOptional()
  @IsNumber({}, { message: 'O ID do evento deve ser um número inteiro.' })
  evento_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'O ID do membro deve ser um número inteiro.' })
  member_id?: number;

  @IsOptional()
  @IsEnum(DomainContributionType, { message: `Tipo de contribuição inválido.` })
  tipo?: DomainContributionType;

  @IsOptional()
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor?: number;

  @IsOptional()
  @IsDateString({}, { message: 'A data deve estar no formato ISO 8601.' })
  data?: string;

  @IsOptional()
  @IsEnum(DomainPaymentMethod, { message: `Método de pagamento inválido.` })
  metodo?: DomainPaymentMethod;

  @IsOptional()
  @IsEnum(DomainContributionStatus, { message: `Status inválido.` })
  status?: DomainContributionStatus;
  @IsOptional() @IsString() finalidade?: string;
  @IsOptional() @IsString() observacao?: string;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) imagens?: string[];
  @IsOptional() @IsString() tipoObjeto?: string;
}
