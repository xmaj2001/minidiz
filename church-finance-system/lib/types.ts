export type UserPermission = "ADMIN" | "USUARIO" | "TESOUREIRO" | "SECRETARIO"
export type UserStatus = "ATIVO" | "INATIVO" | "BLOQUEADO"
export type MemberStatus = "ATIVO" | "INATIVO"
export type Gender = "M" | "F"
export type ContributionType = "DIZIMO" | "OFERTA" | "DOACAO"
export type PaymentMethod = "DINHEIRO" | "TRANSFERENCIA" | "CHEQUE" | "CARTAO"
export type ContributionStatus = "PEDENTE" | "CONFIRMADO" | "CANCELADO"
export type ExpenseStatus = "PENDENTE" | "PAGO" | "CANCELADO"
export type EventStatus = "PLANEJADO" | "EM_ANDAMENTO" | "CONCLUIDO" | "CANCELADO"

export interface User {
  id: number
  nome: string
  email: string
  senha?: string
  permissao: UserPermission
  status: UserStatus
  created_at: string
  updated_at: string
}

export interface MemberDetails {
  id: number
  member_id: number
  data_batismo: string | null
  data_comunhao: string | null
  data_crisma: string | null
  estado_civil: string | null
  observacao: string | null
  created_at: string
  updated_at: string
}

export interface Member {
  id: number
  nome: string
  sobreNome: string
  email: string
  telefone: string
  data_nascimento: string
  endereco: string
  status: MemberStatus
  genero: Gender
  data_cadastro: string
  created_by: number
  created_at: string
  updated_at: string
  details?: MemberDetails
}

export interface Group {
  id: number
  nome: string
  descricao: string
  lider_id: number
  data_criacao: string
  status: string
  created_by: number
  created_at: string
  updated_at: string
  lider?: Member
  membros?: Member[]
}

export interface ContributionDetails {
  id: number
  contribution_id: number
  descricao: string | null
  imagens: string[] | null
  created_at: string
  updated_at: string
}

export interface Contribution {
  id: number
  member_id: number
  tipo: ContributionType
  valor: string
  data_contribuicao: string
  evento_id: number | null
  metodo: PaymentMethod
  finalidade: string | null
  observacao: string | null
  status: ContributionStatus
  created_by: number
  created_at: string
  updated_at: string
  details?: ContributionDetails | null
  member?: Member
  event?: Event | null
}

export interface Expense {
  id: number
  descricao: string
  categoria: string
  valor: string
  data_despesa: string
  fornecedor: string | null
  metodo_pagamento: PaymentMethod
  status: ExpenseStatus
  evento_id: number | null
  observacao: string | null
  created_by: number
  created_at: string
  updated_at: string
  event?: Event | null
}

export interface Event {
  id: number
  nome: string
  descricao: string
  data_inicio: string
  data_fim: string
  local: string
  responsavel_id: number
  orcamento: string
  participantes_esperados: number
  status: EventStatus
  created_by: number
  created_at: string
  updated_at: string
  responsavel?: Member
}

export interface ActivityLog {
  id: number
  user_id: number
  entidade: string
  entidade_id: number
  acao: string
  detalhes: string | null
  ip_address: string | null
  created_at: string
  user?: User
}
