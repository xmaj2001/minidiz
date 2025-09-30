export enum DomainEventType {
  CULTOS = 'CULTOS',
  REUNIOES = 'REUNIOES',
  CONFERENCIAS = 'CONFERENCIAS',
  CELEBRACAO = 'CELEBRACAO',
  ESPECIAIS = 'ESPECIAIS',
  OUTROS = 'OUTROS',
}

export enum DomainEventStatus {
  PROGRAMADO = 'PROGRAMADO',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  FINALIZADO = 'FINALIZADO',
  CANCELADO = 'CANCELADO',
}

export class Event {
  id: number;
  nome: string;
  descricao: string | null;
  data_inicio: Date;
  data_fim: Date;
  local: string | null;
  // responsavel_member_id: number | null; // Chave estrangeira para o Membro
  tipo: DomainEventType;
  status: DomainEventStatus;

  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
