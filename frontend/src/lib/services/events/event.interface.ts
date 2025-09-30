export interface Event {
  id: number;
  nome: string;
  data: string;
  tipo: string;
  grupo_id?: number;
  arrecadacao_total?: number;
  observacao?: string;
  created_at: string;
  updated_at: string;
  group?: { id: number; nome: string };
  attendance?: { id: number; member_id: number; member: { id: number; nome: string } }[];
}

export interface CreateEventData {
  nome: string;
  data: string;
  tipo: string;
  grupo_id?: number;
  observacao?: string;
}

export interface UpdateEventData extends CreateEventData {
  id: number;
}

export interface AddAttendanceData {
  event_id: number;
  member_id: number;
}