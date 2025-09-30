export enum DomainMemberStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  VISITANTE = 'VISITANTE',
}

export enum DomainGender {
  MASCULINO = 'MASCULINO',
  FEMININO = 'FEMININO',
  OUTRO = 'OUTRO',
}

export enum DomainMaritalStatus {
  SOLTEIRO = 'SOLTEIRO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUVO = 'VIUVO',
  UNIAO_ESTAVEL = 'UNIAO_ESTAVEL',
}

export class Member {
  id: number;
  nome: string;
  sobreNome: string;
  email: string | null;
  telefone: string | null;
  data_nascimento: Date | null;
  endereco: string | null;
  status: DomainMemberStatus;
  genero: DomainGender;
  data_cadastro: Date;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
