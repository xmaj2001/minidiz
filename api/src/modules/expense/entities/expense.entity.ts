export enum ExpenseCategory {
  UTILIDADES = 'Utilidades',
  ALIMENTACAO = 'Alimentação',
  MANUTENCAO = 'Manutenção',
  EQUIPAMENTOS = 'Equipamentos',
  TRANSPORTE = 'Transporte',
  PESSOAL = 'Pessoal',
  EVENTO = 'Evento',
  OUTRO = 'Outro',
}

export enum ExpenseStatus {
  PENDENTE = 'Pendente',
  PAGO = 'Pago',
  CANCELADO = 'Cancelado',
}

export enum PaymentMethod {
  DINHEIRO = 'Dinheiro',
  CARTAO_CREDITO = 'Cartão de Crédito',
  CARTAO_DEBITO = 'Cartão de Débito',
  TRANSFERENCIA = 'Transferência',
  EXPRESS = 'Express',
  CHEQUE = 'Cheque',
  OUTRO = 'Outro',
}

export class Expense {
  id: number;
  descricao: string;
  valor: number;
  data: Date;
  categoria: ExpenseCategory;
  status: ExpenseStatus;
  formaPagamento: PaymentMethod;
  fornecedor: string | null;
  observacao: string | null;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
