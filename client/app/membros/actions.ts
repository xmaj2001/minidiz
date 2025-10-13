"use server";
import { ErrorResponse } from "@/config/settings";
import { FormCreateMember } from "@/lib/schemas/member.schema";
import { MemberServices } from "@/lib/services/member.service";
import { revalidateTag } from "next/cache";

export interface StateAction {
  success: boolean | null;
  message: string;
}

export interface StateFormAction {
  success: boolean | null;
  info: {
    title: string;
    message: string;
    error?: ErrorResponse | null;
  };
}
export const RegisterMember = async (
  prev: StateFormAction,
  data: FormCreateMember
): Promise<StateFormAction> => {
  try {
    const apiResult = await MemberServices.create(
      {
        nome: data.nome,
        sobreNome: data.sobreNome,
        email: data.email?.trim().length == 0 ? undefined : data.email,
        telefone: data.telefone?.trim().length == 0 ? undefined : data.telefone,
        genero: data.genero,
        endereco: data.endereco,
        data_nascimento: data.data_nascimento,
        status: data.status,
      },
      1,
      ""
    );
    console.table(apiResult.result);
    if (!apiResult.success)
      return {
        success: apiResult.success,
        info: {
          title: "Foi encontrado um problema",
          message: apiResult.message,
          error: apiResult.error,
        },
      };

    revalidateTag("members");
    return {
      success: apiResult.success,
      info: {
        title: "Registro feito com sucesso",
        message: apiResult.message,
      },
    };
  } catch (error) {
    return {
      success: false,
      info: {
        title: "Foi encontrado um problema critico",
        message: "Notifca o suport para a solucao da mesma",
      },
    };
  }
};
