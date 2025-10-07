import { IMember } from "./member.interface";

export enum ContributionType {
  DIZIMO = "DIZIMO",
  OFERTA = "OFERTA",
  DOACAO = "DOACAO",
}

export enum PaymentMethod {
  NENHUM = "NENHUM",
  DINHEIRO = "DINHEIRO",
  EXPRESS = "EXPRESS",
  TRANSFERENCIA = "TRANSFERENCIA",
  CARTAO = "CARTAO",
  CHEQUE = "CHEQUE",
  OUTRO = "OUTRO",
}

export enum ContributionStatus {
  PENDENTE = "PENDENTE",
  RECEBIDO = "RECEBIDO",
  CANCELADO = "CANCELADO",
}

export interface IEvento {
  id: number;
  nome: string;
  data: string;
  descricao?: string | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}


export interface IContribution {
  id: number;
  evento_id?: number | null;
  member_id: number;
  tipo: ContributionType;
  valor?: string | null;
  data: string;
  metodo:
    | "DINHEIRO"
    | "CARTAO"
    | "TRANSFERENCIA"
    | "EXPRESS"
    | "CARTAO"
    | "CHEQUE"
    | "OUTRO";
  finalidade?: string | null;
  observacao?: string | null;
  descricao?: string | null;
  imagens?: string[] | null;
  member: IMember;
  status: "PENDENTE" | "RECEBIDO" | "CANCELADO";
  tipoObjeto?: string | null;
  created_by?: number | null;
  created_at: string;
  updated_at: string;

  evento?: IEvento;
}

export type IListaContributions = IContribution[];

export interface CreateContributionData {
  evento_id?: number;
  member_id: number;
  tipo: ContributionType;
  valor?: number;
  data: string;
  metodo:
    | "DINHEIRO"
    | "CARTAO"
    | "TRANSFERENCIA"
    | "EXPRESS"
    | "CARTAO"
    | "CHEQUE"
    | "OUTRO";
  finalidade?: string;
  observacao?: string;
  descricao?: string;
  imagens?: string[];
  status: "PENDENTE" | "RECEBIDO" | "CANCELADO";
  tipoObjeto?: string;
  created_by?: number;
}

export interface UpdateContributionData extends CreateContributionData {
  id: number;
}
