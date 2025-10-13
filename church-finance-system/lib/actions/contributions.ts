"use server"

import { revalidatePath } from "next/cache"
import { mockContributions, mockMembers } from "@/lib/mock-data"
import type { Contribution, ContributionFormData } from "@/lib/types"

let contributionsDB = [...mockContributions]

export async function getContributionsAction(): Promise<Contribution[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return contributionsDB
}

export async function getContributionByIdAction(id: number): Promise<Contribution | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return contributionsDB.find((c) => c.id === id) || null
}

export async function createContributionAction(data: ContributionFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const member = mockMembers.find((m) => m.id === data.member_id)

  const newContribution: Contribution = {
    id: contributionsDB.length + 1,
    member_id: data.member_id,
    tipo: data.tipo,
    valor: data.valor,
    data_contribuicao: data.data_contribuicao,
    evento_id: data.evento_id || null,
    metodo: data.metodo,
    finalidade: data.finalidade || null,
    observacao: data.observacao || null,
    status: data.status,
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    details:
      (data.tipo === "OFERTA" || data.tipo === "DOACAO") && data.descricao
        ? {
            id: contributionsDB.length + 1,
            contribution_id: contributionsDB.length + 1,
            descricao: data.descricao,
            imagens: data.imagens || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
        : null,
    member,
    event: null,
  }

  contributionsDB.push(newContribution)
  revalidatePath("/contribuicoes")

  return { success: true, data: newContribution }
}

export async function updateContributionAction(id: number, data: ContributionFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = contributionsDB.findIndex((c) => c.id === id)
  if (index === -1) {
    return { error: "Contribuição não encontrada" }
  }

  const member = mockMembers.find((m) => m.id === data.member_id)

  contributionsDB[index] = {
    ...contributionsDB[index],
    member_id: data.member_id,
    tipo: data.tipo,
    valor: data.valor,
    data_contribuicao: data.data_contribuicao,
    evento_id: data.evento_id || null,
    metodo: data.metodo,
    finalidade: data.finalidade || null,
    observacao: data.observacao || null,
    status: data.status,
    updated_at: new Date().toISOString(),
    member,
  }

  revalidatePath("/contribuicoes")
  return { success: true, data: contributionsDB[index] }
}

export async function deleteContributionAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  contributionsDB = contributionsDB.filter((c) => c.id !== id)
  revalidatePath("/contribuicoes")

  return { success: true }
}
