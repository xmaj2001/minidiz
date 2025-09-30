import { API } from "@/config/settings.ts"
import {CreateMemberData, UpdateMemberData, Member} from "./member.interface"

export const MemberServices = {
  create: async (data: CreateMemberData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(API.members, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      const res_data = await res.json();
      console.log("Data create:", data, "Response:", res_data);

      if (res.status === 200 || res.status === 201) {
        return true;
      }

      console.error("Erro ao criar membro:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  update: async (id: number, data: UpdateMemberData, token?: string): Promise<boolean> => {
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

  listPaginate: async (page: number = 1, limit: number = 10): Promise<{ data: Member[]; total: number }> => {
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
        return data;
      }

      console.error("Erro ao listar membros:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findById: async (id: number): Promise<Member | null> => {
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

  search: async (query: string, page: number = 1, limit: number = 10): Promise<{ data: Member[]; total: number }> => {
    try {
      const url = `${API.members}/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
      const res = await fetch(url, {
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

      console.error("Erro ao buscar membros:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },
};