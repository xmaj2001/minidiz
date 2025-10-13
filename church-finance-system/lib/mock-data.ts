import type { User, Member, Contribution, Expense, Event, Group, ActivityLog } from "./types"

export const mockUsers: User[] = [
  {
    id: 1,
    nome: "Admin Sistema",
    email: "admin@igreja.com",
    permissao: "ADMIN",
    status: "ATIVO",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    nome: "João Silva",
    email: "joao@igreja.com",
    permissao: "TESOUREIRO",
    status: "ATIVO",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    nome: "Maria Santos",
    email: "maria@igreja.com",
    permissao: "SECRETARIO",
    status: "ATIVO",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const mockMembers: Member[] = [
  {
    id: 1,
    nome: "Lander",
    sobreNome: "Dream",
    email: "lander@gmail.com",
    telefone: "999999",
    data_nascimento: "2000-02-01T00:00:00.000Z",
    endereco: "luanda, angola",
    status: "ATIVO",
    genero: "M",
    data_cadastro: "2025-09-29T19:45:52.899Z",
    created_by: 1,
    created_at: "2025-09-29T19:45:52.899Z",
    updated_at: "2025-09-29T19:45:52.899Z",
    details: {
      id: 1,
      member_id: 1,
      data_batismo: null,
      data_comunhao: null,
      data_crisma: null,
      estado_civil: null,
      observacao: "www",
      created_at: "2025-09-29T19:45:52.899Z",
      updated_at: "2025-09-29T19:45:52.899Z",
    },
  },
  {
    id: 2,
    nome: "Ana",
    sobreNome: "Costa",
    email: "ana@gmail.com",
    telefone: "888888",
    data_nascimento: "1995-05-15T00:00:00.000Z",
    endereco: "luanda, angola",
    status: "ATIVO",
    genero: "F",
    data_cadastro: "2025-09-20T10:30:00.000Z",
    created_by: 1,
    created_at: "2025-09-20T10:30:00.000Z",
    updated_at: "2025-09-20T10:30:00.000Z",
  },
]

export const mockContributions: Contribution[] = [
  {
    id: 1,
    member_id: 1,
    tipo: "DIZIMO",
    valor: "1000",
    data_contribuicao: "2025-09-09T23:00:00.000Z",
    evento_id: null,
    metodo: "DINHEIRO",
    finalidade: null,
    observacao: "1231",
    status: "PEDENTE",
    created_by: 1,
    created_at: "2025-09-29T20:01:11.298Z",
    updated_at: "2025-09-29T20:01:11.298Z",
    details: null,
    member: mockMembers[0],
    event: null,
  },
]

export const mockExpenses: Expense[] = [
  {
    id: 1,
    descricao: "Conta de Luz",
    categoria: "Utilidades",
    valor: "500",
    data_despesa: "2025-09-15T00:00:00.000Z",
    fornecedor: "Empresa de Energia",
    metodo_pagamento: "TRANSFERENCIA",
    status: "PAGO",
    evento_id: null,
    observacao: "Pagamento mensal",
    created_by: 1,
    created_at: "2025-09-15T10:00:00.000Z",
    updated_at: "2025-09-15T10:00:00.000Z",
  },
]

export const mockEvents: Event[] = [
  {
    id: 1,
    nome: "Culto de Celebração",
    descricao: "Culto especial de celebração",
    data_inicio: "2025-10-15T18:00:00.000Z",
    data_fim: "2025-10-15T20:00:00.000Z",
    local: "Templo Principal",
    responsavel_id: 1,
    orcamento: "5000",
    participantes_esperados: 200,
    status: "PLANEJADO",
    created_by: 1,
    created_at: "2025-09-29T10:00:00.000Z",
    updated_at: "2025-09-29T10:00:00.000Z",
    responsavel: mockMembers[0],
  },
]

export const mockGroups: Group[] = [
  {
    id: 1,
    nome: "Grupo de Jovens",
    descricao: "Grupo para jovens da igreja",
    lider_id: 1,
    data_criacao: "2025-01-01T00:00:00.000Z",
    status: "ATIVO",
    created_by: 1,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
    lider: mockMembers[0],
    membros: [mockMembers[0], mockMembers[1]],
  },
]

export const mockActivityLogs: ActivityLog[] = [
  {
    id: 1,
    user_id: 1,
    entidade: "members",
    entidade_id: 1,
    acao: "CREATE",
    detalhes: "Criou novo membro: Lander Dream",
    ip_address: "192.168.1.1",
    created_at: "2025-09-29T19:45:52.899Z",
    user: mockUsers[0],
  },
]
