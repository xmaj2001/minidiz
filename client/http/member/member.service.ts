import { API, ApiResponse } from "../confg.http";
import { IMember } from "./member.interface";
import { FormDataRegisterMember } from "./member.schema";

export const ServiceMember = {
  new: async (
    parishId: string,
    formdata: FormDataRegisterMember
  ): Promise<ApiResponse<IMember | null>> => {
    try {
      const url = `${API.members}`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parishId: parishId,
          ...formdata
        })
      });

      const data = await res.json();
      if (res.status === 200) {
        return { result: data, success: true, message: "" };
      }

      // console.error("Erro ao listar membros:", data);
      return {
        result: null,
        success: false,
        message: "Erro ao criar membro",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { result: null, success: false, message: "Erro na requisição:" };
    }
  },

  findAll: async (): Promise<ApiResponse<IMember[]>> => {
    try {
      const url = `${API.members}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["members"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return { result: data, success: true, message: "" };
      }

      // console.error("Erro ao listar membros:", data);
      return {
        result: [],
        success: false,
        message: "Erro ao listar membros:",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição:" };
    }
  },

  listPaginate: async (
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IMember[]>> => {
    try {
      const url = `${API.members}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["members"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return { result: data, success: true, message: "" };
      }

      // console.error("Erro ao listar membros:", data);
      return {
        result: [],
        success: false,
        message: "Erro ao listar membros:",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição:" };
    }
  },
};

export default ServiceMember;
