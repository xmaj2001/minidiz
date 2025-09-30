export enum DomainContributionType {
  DIZIMO = 'DIZIMO',
  OFERTA = 'OFERTA',
  DOACAO = 'DOACAO',
}

export enum DomainPaymentMethod {
  NENHUM = 'NENHUM',
  DINHEIRO = 'DINHEIRO',
  TRANSFERENCIA = 'TRANSFERENCIA',
  CARTAO = 'CARTAO',
  CHEQUE = 'CHEQUE',
  OUTRO = 'OUTRO',
}

export enum DomainContributionStatus {
  PENDENTE = 'PENDENTE',
  RECEBIDO = 'RECEBIDO',
  CANCELADO = 'CANCELADO',
}

export class Contribution {
  id: number;
  evento_id: number | null;
  member_id: number;
  tipo: DomainContributionType;
  valor: string;
  data: Date;
  metodo: DomainPaymentMethod;
  finalidade: string | null;
  observacao: string | null;
  descricao: string | null;
  imagens: string[];
  status: DomainContributionStatus;
  tipoObjeto: string | null;
  created_by: number | null;
  created_at: Date;
  updated_at: Date;
}
