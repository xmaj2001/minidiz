"use server";

import { revalidateTag } from "next/cache";
import { ErrorResponse } from "@/config/settings";
import { FormCreateExpense } from "@/lib/schemas/expense.schema";
import { ExpenseServices } from "@/lib/services/expense.service";
import { CreateExpenseData } from "@/lib/interfaces/expense.interface";
import { format } from "date-fns";

export interface StateFormAction {
  success: boolean | null;
  info: {
    title: string;
    message: string;
    error?: ErrorResponse | null;
  };
}

export const RegisterActionDespesa = async (
  prev: StateFormAction,
  data: FormCreateExpense
): Promise<StateFormAction> => {
  try {

    const payload: CreateExpenseData = {
      descricao: data.descricao,
      valor: data.valor,
      data: format(new Date(data.data), 'yyyy-MM-dd'),
      categoria: data.categoria,
      observacao: data.observacao?? undefined,
      created_by: data.created_by,
      status: data.status,
      forma_pagamento: data.forma_pagamento,
    };
    const apiResult = await ExpenseServices.create(payload, 1, "expense");

    if (!apiResult.success) {
      return {
        success: false,
        info: {
          title: "Erro ao registrar despesa",
          message: apiResult.message,
          error: apiResult.error,
        },
      };
    }

    revalidateTag("despesas");

    return {
      success: true,
      info: {
        title: "Sucesso",
        message: apiResult.message,
      },
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return {
      success: false,
      info: {
        title: "Erro crítico",
        message: "Entre em contato com o suporte para resolver o problema.",
      },
    };
  }
};
