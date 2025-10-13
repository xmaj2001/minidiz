"use server"

import { revalidatePath } from "next/cache"
import { mockMembers } from "@/lib/mock-data"
import type { Member, MemberFormData } from "@/lib/types"

// Simular banco de dados em memória
let membersDB = [...mockMembers]

export async function getMembersAction(): Promise<Member[]> {
  // Em produção, usar: return fetchAPI<Member[]>(API_ENDPOINTS.members)
  await new Promise((resolve) => setTimeout(resolve, 500))
  return membersDB
}

export async function getMemberByIdAction(id: number): Promise<Member | null> {
  // Em produção, usar: return fetchAPI<Member>(`${API_ENDPOINTS.members}/${id}`)
  await new Promise((resolve) => setTimeout(resolve, 300))
  return membersDB.find((m) => m.id === id) || null
}

export async function createMemberAction(data: MemberFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newMember: Member = {
    id: membersDB.length + 1,
    nome: data.nome,
    sobreNome: data.sobreNome,
    email: data.email,
    telefone: data.telefone,
    data_nascimento: data.data_nascimento,
    endereco: data.endereco,
    status: data.status,
    genero: data.genero,
    data_cadastro: new Date().toISOString(),
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    details: {
      id: membersDB.length + 1,
      member_id: membersDB.length + 1,
      data_batismo: data.data_batismo || null,
      data_comunhao: data.data_comunhao || null,
      data_crisma: data.data_crisma || null,
      estado_civil: data.estado_civil || null,
      observacao: data.observacao || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  }

  membersDB.push(newMember)
  revalidatePath("/membros")

  return { success: true, data: newMember }
}

export async function updateMemberAction(id: number, data: MemberFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = membersDB.findIndex((m) => m.id === id)
  if (index === -1) {
    return { error: "Membro não encontrado" }
  }

  membersDB[index] = {
    ...membersDB[index],
    nome: data.nome,
    sobreNome: data.sobreNome,
    email: data.email,
    telefone: data.telefone,
    data_nascimento: data.data_nascimento,
    endereco: data.endereco,
    status: data.status,
    genero: data.genero,
    updated_at: new Date().toISOString(),
    details: {
      ...membersDB[index].details!,
      data_batismo: data.data_batismo || null,
      data_comunhao: data.data_comunhao || null,
      data_crisma: data.data_crisma || null,
      estado_civil: data.estado_civil || null,
      observacao: data.observacao || null,
      updated_at: new Date().toISOString(),
    },
  }

  revalidatePath("/membros")
  return { success: true, data: membersDB[index] }
}

export async function deleteMemberAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  membersDB = membersDB.filter((m) => m.id !== id)
  revalidatePath("/membros")

  return { success: true }
}
