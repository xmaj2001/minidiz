export interface Expense {
  id: number;
  descricao: string;
  valor: number;
  data: string;
  categoria: string;
  evento_id?: number;
  employee_id?: number;
  observacao?: string;
  created_at: string;
  updated_at: string;
  event?: { id: number; nome: string };
  employee?: { id: number; cargo: string; member: { id: number; nome: string } };
}

export interface CreateExpenseData {
  descricao: string;
  valor: number;
  data?: string;
  categoria: string;
  evento_id?: number;
  employee_id?: number;
  observacao?: string;
}

export interface UpdateExpenseData extends CreateExpenseData {
  id: number;
}