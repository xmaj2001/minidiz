"use server";

import { revalidateTag } from "next/cache";
import { ErrorResponse } from "@/config/settings";
import { ContributionType } from "@/lib/interfaces/contribution.interface";
import { FormCreateDoacao } from "@/lib/schemas/contribution.schema";
import { ContributionServices } from "@/lib/services/contribution.service";

export interface StateFormAction {
  success: boolean | null;
  info: {
    title: string;
    message: string;
    error?: ErrorResponse | null;
  };
}

export const RegisterActionContributions = async (
  prev: StateFormAction,
  data: FormCreateDoacao
): Promise<StateFormAction> => {
  try {
    const payload = {
      member_id: data.member_id,
      valor: data.valor,
      metodo: data.metodo,
      data: data.data,
      tipo: ContributionType.DOACAO,
      status: data.status,
      descricao: data.descricao,
      finalidade: data.finalidade,
      observacao: data.observacao,
      imagens: data.imagens || [],
      tipoObjeto: data.tipoObjeto || undefined,
    };

    const apiResult = await ContributionServices.create(payload, 1);

    if (!apiResult.success) {
      return {
        success: false,
        info: {
          title: "Erro ao registrar contribuição",
          message: apiResult.message,
          error: apiResult.error,
        },
      };
    }

    revalidateTag("contributions");

    return {
      success: true,
      info: {
        title: "Sucesso",
        message: apiResult.message,
      },
    };
  } catch (error) {
    console.error("Unexpected error in RegisterActionContributions:", error);
    return {
      success: false,
      info: {
        title: "Erro crítico",
        message: "Entre em contato com o suporte para resolver o problema.",
      },
    };
  }
};
