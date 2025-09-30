import { API } from "@/config/settings";
import {CreateUserData, UpdateUserData, User} from "./user.interface"

export const UserServices = {
  create: async (data: CreateUserData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(API.users, {
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

      console.error("Erro ao criar usuário:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  update: async (id: number, data: UpdateUserData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.users}/${id}`, {
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

      console.error("Erro ao atualizar usuário:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  listPaginate: async (page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number }> => {
    try {
      const url = `${API.users}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { tags: ["users"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar usuários:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findById: async (id: number, token?: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API.users}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { tags: ["users"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar usuário:", data);
      return null;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  },

  block: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.users}/${id}/block`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      const res_data = await res.json();
      console.log("Block user:", id, "Response:", res_data);

      if (res.status === 200) {
        return true;
      }

      console.error("Erro ao bloquear usuário:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  remove: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.users}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.status === 200 || res.status === 204) {
        return true;
      }

      console.error("Erro ao deletar usuário:", await res.json());
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },
};