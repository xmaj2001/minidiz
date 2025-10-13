import { API, ApiResponse } from "@/config/settings";
import {
  CreateMemberData,
  UpdateMemberData,
  IMember,
  IListaMembers,
} from "../interfaces/member.interface";

export const MemberServices = {
  create: async (
    data: CreateMemberData,
    userId: number,
    token?: string
  ): Promise<ApiResponse<IMember | null>> => {
    try {
      const res = await fetch(API.members, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ ...data, created_by: userId }),
      });

      const res_data = await res.json();
      console.log("Data create:", data, "Response:", res_data);
      if (res.status === 200 || res.status === 201) {
        return {
          result: res_data,
          success: true,
          message: "Member Create",
          error: null,
        };
      }

      console.error("Erro ao criar membro:", res_data);
      return {
        result: null,
        error: res_data.errors ? res_data : null,
        success: false,
        message: res_data.message as string | "Erro ao criar membro",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        result: null,
        success: false,
        error: null,
        message: "Erro ao criar membro",
      };
    }
  },

  update: async (
    id: number,
    data: UpdateMemberData,
    token?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API.members}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      const res_data = await res.json();
      console.log("Data update:", data, "Response:", res_data);

      if (res.status === 200) {
        return true;
      }

      console.error("Erro ao atualizar membro:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
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

  findById: async (id: number): Promise<IMember | null> => {
    try {
      const res = await fetch(`${API.members}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["members"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar membro:", data);
      return null;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  },

  remove: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.members}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.status === 200 || res.status === 204) {
        return true;
      }

      console.error("Erro ao deletar membro:", await res.json());
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  search: async (
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IListaMembers | []>> => {
    try {
      const url = `${API.members}/search?q=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["members"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return { result: data, success: true, message: "Data obitidos com sucesso" };
      }

      console.error("Erro ao buscar membros:", data);
      return { result: [], success: false, message: "Erro ao buscar membros" };
    } catch (error) {
      console.log("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição" };
    }
  },
};
