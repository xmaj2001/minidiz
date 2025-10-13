"use server"

import { revalidatePath } from "next/cache"
import { mockExpenses } from "@/lib/mock-data"
import type { Expense, ExpenseFormData } from "@/lib/types"

let expensesDB = [...mockExpenses]

export async function getExpensesAction(): Promise<Expense[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return expensesDB
}

export async function getExpenseByIdAction(id: number): Promise<Expense | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return expensesDB.find((e) => e.id === id) || null
}

export async function createExpenseAction(data: ExpenseFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newExpense: Expense = {
    id: expensesDB.length + 1,
    descricao: data.descricao,
    categoria: data.categoria,
    valor: data.valor,
    data_despesa: data.data_despesa,
    fornecedor: data.fornecedor || null,
    metodo_pagamento: data.metodo_pagamento,
    status: data.status,
    evento_id: data.evento_id || null,
    observacao: data.observacao || null,
    created_by: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  expensesDB.push(newExpense)
  revalidatePath("/despesas")

  return { success: true, data: newExpense }
}

export async function updateExpenseAction(id: number, data: ExpenseFormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const index = expensesDB.findIndex((e) => e.id === id)
  if (index === -1) {
    return { error: "Despesa não encontrada" }
  }

  expensesDB[index] = {
    ...expensesDB[index],
    descricao: data.descricao,
    categoria: data.categoria,
    valor: data.valor,
    data_despesa: data.data_despesa,
    fornecedor: data.fornecedor || null,
    metodo_pagamento: data.metodo_pagamento,
    status: data.status,
    evento_id: data.evento_id || null,
    observacao: data.observacao || null,
    updated_at: new Date().toISOString(),
  }

  revalidatePath("/despesas")
  return { success: true, data: expensesDB[index] }
}

export async function deleteExpenseAction(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 500))

  expensesDB = expensesDB.filter((e) => e.id !== id)
  revalidatePath("/despesas")

  return { success: true }
}
