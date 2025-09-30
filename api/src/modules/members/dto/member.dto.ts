// src/member/dto/member.dto.ts

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { DomainGender, DomainMemberStatus } from '../entities/member.entity';

// DTO de Criação
export class CreateMemberDto {
  @IsNotEmpty({ message: 'O primeiro nome do membro é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsNotEmpty({ message: 'O sobrenome do membro é obrigatório.' })
  @IsString({ message: 'O sobrenome deve ser uma string.' })
  sobreNome: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido (ex: membro@igreja.com).' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber('AO', {
    message:
      'O telefone deve ser um número de celular válido no formato internacional (ex: +24499999999).',
  })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @MinLength(9, { message: 'O telefone deve conter pelo menos 9 dígitos.' })
  telefone?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message:
        'A data de nascimento deve estar no formato ISO 8601 (AAAA-MM-DD).',
    },
  )
  data_nascimento?: string; // Usamos string aqui e convertemos para Date no service/controller

  @IsOptional()
  @IsString({ message: 'O endereço deve ser uma string.' })
  endereco?: string;

  @IsNotEmpty({ message: 'O status do membro é obrigatório.' })
  @IsEnum(DomainMemberStatus, {
    message: `Status inválido. Use um dos valores: ${Object.values(DomainMemberStatus).join(', ')}`,
  })
  status: DomainMemberStatus;

  @IsNotEmpty({ message: 'O gênero é obrigatório.' })
  @IsEnum(DomainGender, {
    message: `Gênero inválido. Use um dos valores: ${Object.values(DomainGender).join(', ')}`,
  })
  genero: DomainGender;

  @IsOptional()
  @IsNumber(
    {},
    { message: 'O ID do usuário que cadastrou deve ser um número.' },
  )
  created_by?: number;
}

// DTO de Atualização (Todos os campos são opcionais)
export class UpdateMemberDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  nome?: string;

  @IsOptional()
  @IsString({ message: 'O sobrenome deve ser uma string.' })
  sobreNome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  telefone?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'A data de nascimento deve estar no formato ISO 8601.' },
  )
  data_nascimento?: string;

  @IsOptional()
  @IsString({ message: 'O endereço deve ser uma string.' })
  endereco?: string;

  @IsOptional()
  @IsEnum(DomainMemberStatus, {
    message: `Status inválido. Use um dos valores: ${Object.values(DomainMemberStatus).join(', ')}`,
  })
  status?: DomainMemberStatus;

  @IsOptional()
  @IsEnum(DomainGender, {
    message: `Gênero inválido. Use um dos valores: ${Object.values(DomainGender).join(', ')}`,
  })
  genero?: DomainGender;
}
