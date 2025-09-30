import { Member } from '../../members/entities/member.entity';

export enum DomainGroupType {
  CELULA = 'CELULA',
  MINISTERIO = 'MINISTERIO',
  EQUIPE = 'EQUIPE',
  PROJETO = 'PROJETO',
  OUTRO = 'OUTRO',
}

export enum DomainGroupStatus {
  ATIVO = 'ATIVO',
  INATIVO = 'INATIVO',
  EM_FORMACAO = 'EM_FORMACAO',
}

export class Group {
  id: number;
  nome: string;
  descricao: string | null;
  // tipo: DomainGroupType;
  // status: DomainGroupStatus;
  lider_id: number; // Chave estrangeira para o Membro Líder
  // data_formacao: Date;

  // Propriedade opcional para o domínio (a lista de membros)
  members?: Member[];

  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
