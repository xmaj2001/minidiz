// src/user/dto/user.dto.ts

import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DomainUserPermission } from '../entities/user.entity';

// DTO de Criação
export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome completo do usuário é obrigatório.' })
  @IsString({ message: 'O nome deve ser fornecido como uma string de texto.' })
  nome: string;

  @IsNotEmpty({ message: 'O endereço de email para login é obrigatório.' })
  @IsEmail(
    {},
    {
      message:
        'O formato do email fornecido não é válido. Ex: user@exemplo.com',
    },
  )
  email: string;

  @IsNotEmpty({ message: 'A senha para acesso é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, {
    message:
      'A senha deve ter no mínimo 8 caracteres para garantir a segurança.',
  })
  senha: string;

  @IsNotEmpty({ message: 'O nível de permissão é obrigatório.' })
  // Usa o Enum de Domínio e valida contra seus valores.
  @IsEnum(DomainUserPermission, {
    message: `Permissão inválida. Use um dos valores: ${Object.values(DomainUserPermission).join(', ')}`,
  })
  permissao: DomainUserPermission;
}

// DTO de Atualização
export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser fornecido como uma string de texto.' })
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'O formato do email fornecido não é válido.' })
  email?: string;

  @IsOptional()
  @IsEnum(DomainUserPermission, {
    message: `Permissão inválida. Use um dos valores: ${Object.values(DomainUserPermission).join(', ')}`,
  })
  permissao?: DomainUserPermission;
}

// DTO para Bloqueio de Usuário
export class BlockUserDto {
  @IsNumber(
    {},
    { message: 'O ID do usuário a ser bloqueado deve ser um número inteiro.' },
  )
  @IsNotEmpty({
    message: 'O ID do usuário que será bloqueado (alvo) é obrigatório.',
  })
  id: number;

  @IsNumber(
    {},
    {
      message: 'O ID do usuário que executa a ação deve ser um número inteiro.',
    },
  )
  @IsNotEmpty({
    message: 'O ID do administrador executando o bloqueio é obrigatório.',
  })
  currentUserId: number;
}
