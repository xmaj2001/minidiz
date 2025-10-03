import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

// DTO de Criação do Grupo
export class CreateGroupDto {
  @IsNotEmpty({ message: 'O nome do grupo é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao?: string;

  // @IsNotEmpty({ message: 'O tipo de grupo é obrigatório.' })
  // @IsEnum(DomainGroupType, {
  //   message: `Tipo de grupo inválido. Use: ${Object.values(DomainGroupType).join(', ')}`,
  // })
  // tipo: DomainGroupType;

  // @IsNotEmpty({ message: 'O status do grupo é obrigatório.' })
  // @IsEnum(DomainGroupStatus, {
  //   message: `Status inválido. Use: ${Object.values(DomainGroupStatus).join(', ')}`,
  // })
  // status: DomainGroupStatus;

  @IsNotEmpty({ message: 'O ID do membro líder é obrigatório.' })
  @IsNumber({}, { message: 'O ID do líder deve ser um número inteiro.' })
  lider_id: number;

  // @IsNotEmpty({ message: 'A data de formação é obrigatória.' })
  // @IsDateString(
  //   {},
  //   {
  //     message:
  //       'A data de formação deve estar no formato ISO 8601 (AAAA-MM-DD).',
  //   },
  // )
  // data_formacao: string;

  @IsNumber(
    {},
    { message: 'O ID do usuário que registrou deve ser um número.' },
  )
  created_by: number;
}

// DTO de Atualização do Grupo
export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  // @IsOptional()
  // @IsEnum(DomainGroupType)
  // tipo?: DomainGroupType;

  // @IsOptional()
  // @IsEnum(DomainGroupStatus)
  // status?: DomainGroupStatus;

  @IsOptional()
  @IsNumber()
  lider_id?: number;

  // @IsOptional()
  // @IsDateString()
  // data_formacao?: string;
}

// DTO para adicionar/remover membros (M:N)
export class GroupMemberDto {
  @IsNotEmpty({ message: 'O ID do grupo é obrigatório.' })
  @IsNumber({}, { message: 'O ID do grupo deve ser um número inteiro.' })
  group_id: number;

  @IsNotEmpty({ message: 'A lista de IDs de membros é obrigatória.' })
  @IsArray({ message: 'memberIds deve ser um array de números.' })
  @ArrayNotEmpty({ message: 'A lista de IDs de membros não pode estar vazia.' })
  @IsNumber(
    {},
    {
      each: true,
      message: 'Cada item em memberIds deve ser um número inteiro.',
    },
  )
  memberIds: number[];
}
