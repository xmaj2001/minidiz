export interface ActivityLog {
  id: number;
  user_id: number;
  entidade: string;
  entidade_id: number;
  acao: string;
  dados_anteriores?: any;
  dados_atuais?: any;
  data_acao: string;
  observacao?: string;
  user: { id: number; nome: string };
}