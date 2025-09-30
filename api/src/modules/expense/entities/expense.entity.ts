export enum DomainExpenseCategory {
  MANUTENCAO = 'MANUTENCAO',
  SALARIOS = 'SALARIOS',
  EVENTOS = 'EVENTOS',
  MISSOES = 'MISSOES',
  CARIDADE = 'CARIDADE',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  OUTRO = 'OUTRO',
}

export class Expense {
  id: number;
  descricao: string;
  valor: string;
  data: Date;
  categoria: DomainExpenseCategory;
  evento_id: number | null;
  employee_id: number | null;
  observacao: string | null;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
