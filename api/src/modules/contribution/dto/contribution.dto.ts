// src/contribution/dto/contribution.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'; // Importe esses do Swagger
import {
  DomainContributionStatus,
  DomainContributionType,
  DomainPaymentMethod,
} from '../entities/contribution.entity';

// DTO de Criação
export class CreateContributionDto {
  @ApiPropertyOptional({
    description: 'ID do evento associado (opcional)',
    example: 123,
    type: Number,
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do evento deve ser um número inteiro, se aplicável.' },
  )
  evento_id?: number;

  @ApiProperty({
    description: 'ID do membro contribuinte (obrigatório)',
    example: 456,
    type: Number,
  })
  @IsNotEmpty({ message: 'O ID do membro contribuinte é obrigatório.' })
  @IsNumber({}, { message: 'O ID do membro deve ser um número inteiro.' })
  member_id: number;

  @ApiProperty({
    description: 'Tipo de contribuição (obrigatório)',
    enum: DomainContributionType,
    example: DomainContributionType.DIZIMO, // Ajuste para um valor real do seu enum
  })
  @IsNotEmpty({ message: 'O tipo de contribuição é obrigatório.' })
  @IsEnum(DomainContributionType, {
    message: `Tipo de contribuição inválido. Use: ${Object.values(DomainContributionType).join(', ')}`,
  })
  tipo: DomainContributionType;

  @ApiProperty({
    description: 'Valor da contribuição (obrigatório, positivo)',
    example: 100.5,
    type: Number,
  })
  @IsNotEmpty({ message: 'O valor da contribuição é obrigatório.' })
  @IsNumber(
    {},
    {
      message:
        'O valor deve ser um número. Use string para alta precisão, se necessário.',
    },
  )
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor: number;

  @ApiProperty({
    description: 'Data da contribuição no formato ISO 8601 (obrigatório)',
    example: '2025-10-06T00:00:00Z',
    type: String,
  })
  @IsNotEmpty({ message: 'A data da contribuição é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data deve estar no formato ISO 8601 (AAAA-MM-DD).' },
  )
  data: string;

  @ApiProperty({
    description: 'Método de pagamento (obrigatório)',
    enum: DomainPaymentMethod,
    example: DomainPaymentMethod.DINHEIRO, // Ajuste para um valor real
  })
  @IsNotEmpty({ message: 'O método de pagamento é obrigatório.' })
  @IsEnum(DomainPaymentMethod, {
    message: `Método de pagamento inválido. Use: ${Object.values(DomainPaymentMethod).join(', ')}`,
  })
  metodo: DomainPaymentMethod;

  @ApiPropertyOptional({
    description: 'Finalidade da contribuição (opcional)',
    example: 'Apoio ao projeto X',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A finalidade deve ser uma string.' })
  finalidade?: string;

  @ApiPropertyOptional({
    description: 'Observação adicional (opcional)',
    example: 'Pagamento via app',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'A observação deve ser uma string.' })
  observacao?: string;

  @ApiPropertyOptional({
    description: 'Descrição do bem doado (opcional)',
    example: 'Livro de programação',
    type: String,
  })
  @IsOptional()
  @IsString({
    message: 'A descrição do bem (se aplicável) deve ser uma string.',
  })
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Array de URLs de imagens (opcional)',
    type: [String],
    example: ['https://exemplo.com/img1.jpg', 'https://exemplo.com/img2.jpg'],
  })
  @IsOptional()
  @IsArray({ message: 'Imagens deve ser um array de URLs.' })
  @IsString({
    each: true,
    message: 'Cada item em imagens deve ser uma string de URL.',
  })
  imagens?: string[];

  @ApiPropertyOptional({
    description: 'Status da contribuição (opcional)',
    enum: DomainContributionStatus,
    example: DomainContributionStatus.PENDENTE, // Ajuste para um valor real
  })
  @IsOptional()
  @IsEnum(DomainContributionStatus, {
    message: `Status inválido. Use: ${Object.values(DomainContributionStatus).join(', ')}`,
  })
  status?: DomainContributionStatus;

  @ApiPropertyOptional({
    description: 'Tipo do objeto (opcional)',
    example: 'Bem material',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'O tipo do objeto deve ser uma string.' })
  tipoObjeto?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário que registrou',
    example: 789,
    type: Number,
  })
  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by: number;
}

// DTO de Atualização
export class UpdateContributionDto {
  @ApiPropertyOptional({
    description: 'ID do evento (opcional)',
    example: 123,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O ID do evento deve ser um número inteiro.' })
  evento_id?: number;

  @ApiPropertyOptional({
    description: 'ID do membro (opcional)',
    example: 456,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O ID do membro deve ser um número inteiro.' })
  member_id?: number;

  @ApiPropertyOptional({
    description: 'Tipo de contribuição (opcional)',
    enum: DomainContributionType,
    example: DomainContributionType.DOACAO,
  })
  @IsOptional()
  @IsEnum(DomainContributionType, { message: `Tipo de contribuição inválido.` })
  tipo?: DomainContributionType;

  @ApiPropertyOptional({
    description: 'Novo valor (opcional, positivo)',
    example: 150.75,
    type: Number,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O valor deve ser um número.' })
  @Min(0.01, { message: 'O valor deve ser positivo e maior que zero.' })
  valor?: number;

  @ApiPropertyOptional({
    description: 'Nova data no formato ISO 8601 (opcional)',
    example: '2025-10-07T00:00:00Z',
    type: String,
  })
  @IsOptional()
  @IsDateString({}, { message: 'A data deve estar no formato ISO 8601.' })
  data?: string;

  @ApiPropertyOptional({
    description: 'Método de pagamento (opcional)',
    enum: DomainPaymentMethod,
    example: DomainPaymentMethod.NENHUM,
  })
  @IsOptional()
  @IsEnum(DomainPaymentMethod, { message: `Método de pagamento inválido.` })
  metodo?: DomainPaymentMethod;

  @ApiPropertyOptional({
    description: 'Status da contribuição (opcional)',
    enum: DomainContributionStatus,
    example: DomainContributionStatus.RECEBIDO,
  })
  @IsOptional()
  @IsEnum(DomainContributionStatus, { message: `Status inválido.` })
  status?: DomainContributionStatus;

  @ApiPropertyOptional({
    description: 'Finalidade (opcional)',
    example: 'Atualização de apoio',
    type: String,
  })
  @IsOptional()
  @IsString()
  finalidade?: string;

  @ApiPropertyOptional({
    description: 'Observação (opcional)',
    example: 'Atualizado via web',
    type: String,
  })
  @IsOptional()
  @IsString()
  observacao?: string;

  @ApiPropertyOptional({
    description: 'Descrição (opcional)',
    example: 'Novo livro',
    type: String,
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional({
    description: 'Array de URLs de imagens (opcional)',
    type: [String],
    example: ['https://exemplo.com/nova-img.jpg'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imagens?: string[];

  @ApiPropertyOptional({
    description: 'Tipo do objeto (opcional)',
    example: 'Bem imaterial',
    type: String,
  })
  @IsOptional()
  @IsString()
  tipoObjeto?: string;
}
