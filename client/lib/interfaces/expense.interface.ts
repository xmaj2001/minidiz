export enum ExpenseCategory {
  UTILIDADES = "Utilidades",
  ALIMENTACAO = "Alimentação",
  MANUTENCAO = "Manutenção",
  EQUIPAMENTOS = "Equipamentos",
  TRANSPORTE = "Transporte",
  PESSOAL = "Pessoal",
  EVENTO = "Evento",
  OUTRO = "Outro",
}

export enum ExpenseStatus {
  PENDENTE = "Pendente",
  PAGO = "Pago",
  CANCELADO = "Cancelado",
}

export enum PaymentMethod {
  DINHEIRO = "Dinheiro",
  CARTAO_CREDITO = "Cartão de Crédito",
  CARTAO_DEBITO = "Cartão de Débito",
  TRANSFERENCIA = "Transferência",
  EXPRESS = "Express",
  CHEQUE = "Cheque",
  OUTRO = "Outro",
}

export interface IExpense {
  id: number;
  descricao: string;
  valor: number;
  data: string; // ISO string
  categoria: ExpenseCategory;
  status: ExpenseStatus;
  forma_pagamento: PaymentMethod;
  fornecedor?: string | null;
  observacao?: string | null;
  created_by?: number | null;
  created_at: string; // ISO string
  updated_at: string; // ISO string
}

export interface CreateExpenseData {
  descricao: string;
  valor: number;
  data: string; // ISO string
  categoria: ExpenseCategory;
  status: ExpenseStatus;
  forma_pagamento: PaymentMethod;
  fornecedor?: string;
  observacao?: string;
  created_by: number;
}

export interface UpdateExpenseData {
  descricao?: string;
  valor?: number;
  data?: string; // ISO string
  categoria?: ExpenseCategory;
  status?: ExpenseStatus;
  forma_pagamento?: PaymentMethod;
  fornecedor?: string;
  observacao?: string;
}

export interface ExpenseQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  categoria?: ExpenseCategory;
  status?: ExpenseStatus;
  data_inicio?: string; // ISO string
  data_fim?: string; // ISO string
}

export interface IListaExpenses {
  items: IExpense[];
  total: number;
  page: number;
  limit: number;
}