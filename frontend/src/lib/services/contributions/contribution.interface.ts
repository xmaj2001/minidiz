export interface Contribution {
  id: number;
  member_id: number;
  tipo: string;
  valor?: number;
  data_contribuicao: string;
  evento_id?: number;
  metodo?: string;
  finalidade?: string;
  observacao?: string;
  created_at: string;
  updated_at: string;
  details?: ContributionDetails;
  member?: { id: number; nome: string };
  event?: { id: number; nome: string };
}

export interface ContributionDetails {
  id: number;
  contribution_id: number;
  descricao: string;
  valor_estimado?: number;
  status?: string;
  imagens: string[];
  observacao?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContributionData {
  member_id: number;
  tipo: string;
  valor?: number;
  data_contribuicao?: string;
  evento_id?: number;
  metodo?: string;
  finalidade?: string;
  observacao?: string;
  details?: {
    descricao: string;
    valor_estimado?: number;
    status?: string;
    imagens?: string[];
    observacao?: string;
  };
}

export interface UpdateContributionData extends CreateContributionData {
  id: number;
}