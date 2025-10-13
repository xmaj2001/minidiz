"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { mockUsers } from "@/lib/mock-data"
import type { LoginFormData } from "@/lib/validations"

export async function loginAction(data: LoginFormData) {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Buscar usuário (em produção, usar API real)
  const user = mockUsers.find((u) => u.email === data.email)

  if (!user) {
    return { error: "Email ou senha incorretos" }
  }

  // Em produção, verificar senha com hash
  // const isValidPassword = await bcrypt.compare(data.senha, user.senha)

  // Criar sessão (em produção, usar JWT ou session)
  const cookieStore = await cookies()
  cookieStore.set("user_session", JSON.stringify({ id: user.id, email: user.email, nome: user.nome }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: "/",
  })

  redirect("/")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("user_session")
  redirect("/login")
}

export async function recoverPasswordAction(email: string) {
  // Simular delay de rede
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Em produção, enviar email de recuperação
  console.log("[v0] Enviando email de recuperação para:", email)

  return { success: true, message: "Email de recuperação enviado com sucesso!" }
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get("user_session")

  if (!session) {
    return null
  }

  try {
    return JSON.parse(session.value)
  } catch {
    return null
  }
}
