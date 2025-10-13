"use server"

import { revalidatePath } from "next/cache"
import { mockUsers } from "@/lib/mock-data"
import type { User, UserFormData } from "@/lib/types"

let usersDB = [...mockUsers]

export async function getUsersAction(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return usersDB
}

export async function getUserByIdAction(id: number): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return usersDB.find((u) => u.id === id) || null
}

export async function createUserAction(data: UserFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: usersDB.length + 1,
    nome: data.nome,
    email: data.email,
    permissao: data.permissao,
    status: data.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  usersDB.push(newUser)
  revalidatePath("/usuarios")

  return { success: true, data: newUser }
}

export async function updateUserAction(id: number, data: UserFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = usersDB.findIndex((u) => u.id === id)
  if (index === -1) {
    return { error: "Usuário não encontrado" }
  }

  usersDB[index] = {
    ...usersDB[index],
    nome: data.nome,
    email: data.email,
    permissao: data.permissao,
    status: data.status,
    updated_at: new Date().toISOString(),
  }

  revalidatePath("/usuarios")
  return { success: true, data: usersDB[index] }
}

export async function deleteUserAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  usersDB = usersDB.filter((u) => u.id !== id)
  revalidatePath("/usuarios")

  return { success: true }
}

export async function blockUserAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = usersDB.findIndex((u) => u.id === id)
  if (index === -1) {
    return { error: "Usuário não encontrado" }
  }

  usersDB[index].status = "BLOQUEADO"
  revalidatePath("/usuarios")

  return { success: true }
}
