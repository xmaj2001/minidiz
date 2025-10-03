export interface IGrupo {
  id: number;
  nome: string;
  lider_id: number;
  descricao: string | null;
  created_by: number | null;
  created_at: string;
  updated_at: string;
}

export enum StatusMember {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO",
  PENDENTE = "PENDENTE",
}
export interface IMember {
  id: number;
  nome: string;
  sobreNome: string;
  email?: string | null;
  telefone?: string | null;
  data_nascimento: string | null;
  endereco: string | null;

  status: StatusMember;
  genero: "MASCULINO" | "FEMININO" | "OUTRO" | "NAO_INFORMADO";

  data_cadastro: string;
  created_by: number | null;
  created_at: string;
  updated_at: string;

  grupos_membro: IGrupo[];
  lidera_grupos: IGrupo[];
}

export type IListaMembers = IMember[];

export interface CreateMemberData {
  nome: string;
  sobreNome: string;
  email?: string | null;
  telefone?: string | null;
  data_nascimento: string | null;
  endereco?: string | null;
  status: "ATIVO" | "INATIVO" | "PENDENTE";
  genero: "MASCULINO" | "FEMININO" | "OUTRO" | "NAO_INFORMADO";
}

export interface UpdateMemberData extends CreateMemberData {
  id: number;
}
