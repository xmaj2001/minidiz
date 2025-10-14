export enum EventStatus {
  PLANEJADO = 'Planejado',
  REALIZANDO = 'Realizando',
  CONCLUIDO = 'Concluído',
  CANCELADO = 'Cancelado',
}

export enum EventType {
  GERAL = 'Geral',
  REUNIAO = 'Reunião',
  CULTO = 'Culto',
  SOCIAL = 'Social',
  CONFERENCIA = 'Conferência',
  VIGILIA = 'Vigília',
  MUSICAL = 'Musical',
  ADMINISTRATIVO = 'Administrativo',
  EVENTO_ESPECIAL = 'Evento Especial',
  OUTRO = 'Outro',
}

export class Event {
  id: number;
  nome: string;
  descricao: string | null;
  data: Date;
  horaio: string;
  local: string | null;
  orcamento: number;
  observacoes: string | null;
  tipo: EventType;
  status: EventStatus;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}
