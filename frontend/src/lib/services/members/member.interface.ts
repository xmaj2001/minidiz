export interface Member {
  id: number;
  nome: string;
  sobreNome: string;
  email?: string;
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  status: string;
  data_cadastro: string;
  created_at: string;
  updated_at: string;
  details?: MemberDetails;
}

export interface MemberDetails {
  id: number;
  member_id: number;
  data_batismo?: string;
  data_comunhao?: string;
  data_crisma?: string;
  estado_civil?: string;
  observacao?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMemberData {
  nome: string;
  sobreNome: string;
  email?: string;
  telefone?: string;
  data_nascimento?: string;
  endereco?: string;
  status?: string;
  details?: {
    data_batismo?: string;
    data_comunhao?: string;
    data_crisma?: string;
    estado_civil?: string;
    observacao?: string;
  };
}

export interface UpdateMemberData extends CreateMemberData {
  id: number;
}