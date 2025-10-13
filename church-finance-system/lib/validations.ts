import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
})

export const recoverPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
})

export const userSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres").optional(),
  permissao: z.enum(["ADMIN", "USUARIO", "TESOUREIRO", "SECRETARIO"]),
  status: z.enum(["ATIVO", "INATIVO", "BLOQUEADO"]),
})

export const memberSchema = z.object({
  nome: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  sobreNome: z.string().min(2, "Sobrenome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(6, "Telefone inválido"),
  data_nascimento: z.string(),
  endereco: z.string().min(5, "Endereço deve ter no mínimo 5 caracteres"),
  genero: z.enum(["M", "F"]),
  status: z.enum(["ATIVO", "INATIVO"]),
  // Details
  data_batismo: z.string().optional().nullable(),
  data_comunhao: z.string().optional().nullable(),
  data_crisma: z.string().optional().nullable(),
  estado_civil: z.string().optional().nullable(),
  observacao: z.string().optional().nullable(),
})

export const groupSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  lider_id: z.number().min(1, "Selecione um líder"),
  status: z.string(),
})

export const contributionSchema = z.object({
  member_id: z.number().min(1, "Selecione um membro"),
  tipo: z.enum(["DIZIMO", "OFERTA", "DOACAO"]),
  valor: z.string().min(1, "Valor é obrigatório"),
  data_contribuicao: z.string(),
  metodo: z.enum(["DINHEIRO", "TRANSFERENCIA", "CHEQUE", "CARTAO"]),
  evento_id: z.number().optional().nullable(),
  finalidade: z.string().optional().nullable(),
  observacao: z.string().optional().nullable(),
  status: z.enum(["PEDENTE", "CONFIRMADO", "CANCELADO"]),
  // Details para ofertas/doações
  descricao: z.string().optional().nullable(),
  imagens: z.array(z.string()).optional().nullable(),
})

export const expenseSchema = z.object({
  descricao: z.string().min(5, "Descrição deve ter no mínimo 5 caracteres"),
  categoria: z.string().min(3, "Categoria é obrigatória"),
  valor: z.string().min(1, "Valor é obrigatório"),
  data_despesa: z.string(),
  fornecedor: z.string().optional().nullable(),
  metodo_pagamento: z.enum(["DINHEIRO", "TRANSFERENCIA", "CHEQUE", "CARTAO"]),
  status: z.enum(["PENDENTE", "PAGO", "CANCELADO"]),
  evento_id: z.number().optional().nullable(),
  observacao: z.string().optional().nullable(),
})

export const eventSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  data_inicio: z.string(),
  data_fim: z.string(),
  local: z.string().min(3, "Local é obrigatório"),
  responsavel_id: z.number().min(1, "Selecione um responsável"),
  orcamento: z.string().min(1, "Orçamento é obrigatório"),
  participantes_esperados: z.number().min(1, "Número de participantes é obrigatório"),
  status: z.enum(["PLANEJADO", "EM_ANDAMENTO", "CONCLUIDO", "CANCELADO"]),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RecoverPasswordFormData = z.infer<typeof recoverPasswordSchema>
export type UserFormData = z.infer<typeof userSchema>
export type MemberFormData = z.infer<typeof memberSchema>
export type GroupFormData = z.infer<typeof groupSchema>
export type ContributionFormData = z.infer<typeof contributionSchema>
export type ExpenseFormData = z.infer<typeof expenseSchema>
export type EventFormData = z.infer<typeof eventSchema>
