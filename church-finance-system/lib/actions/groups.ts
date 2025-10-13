"use server"

import { revalidatePath } from "next/cache"
import { mockGroups, mockMembers } from "@/lib/mock-data"
import type { Group, GroupFormData } from "@/lib/types"

let groupsDB = [...mockGroups]

export async function getGroupsAction(): Promise<Group[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return groupsDB
}

export async function getGroupByIdAction(id: number): Promise<Group | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return groupsDB.find((g) => g.id === id) || null
}

export async function createGroupAction(data: GroupFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const lider = mockMembers.find((m) => m.id === data.lider_id)

  const newGroup: Group = {
    id: groupsDB.length + 1,
    nome: data.nome,
    descricao: data.descricao,
    lider_id: data.lider_id,
    data_criacao: new Date().toISOString(),
    status: data.status,
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    lider,
    membros: [],
  }

  groupsDB.push(newGroup)
  revalidatePath("/grupos")

  return { success: true, data: newGroup }
}

export async function updateGroupAction(id: number, data: GroupFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = groupsDB.findIndex((g) => g.id === id)
  if (index === -1) {
    return { error: "Grupo não encontrado" }
  }

  const lider = mockMembers.find((m) => m.id === data.lider_id)

  groupsDB[index] = {
    ...groupsDB[index],
    nome: data.nome,
    descricao: data.descricao,
    lider_id: data.lider_id,
    status: data.status,
    updated_at: new Date().toISOString(),
    lider,
  }

  revalidatePath("/grupos")
  return { success: true, data: groupsDB[index] }
}

export async function deleteGroupAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  groupsDB = groupsDB.filter((g) => g.id !== id)
  revalidatePath("/grupos")

  return { success: true }
}
