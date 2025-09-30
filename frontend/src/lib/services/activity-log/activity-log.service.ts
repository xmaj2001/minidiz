import { API } from "@/config/settings";
import {ActivityLog} from "./activity-log.interface"

export const ActivityLogServices = {
  listPaginate: async (page: number = 1, limit: number = 10, token?: string): Promise<{ data: ActivityLog[]; total: number }> => {
    try {
      const url = `${API.activityLogs}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { tags: ["activity-logs"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar logs:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findByUser: async (userId: number, page: number = 1, limit: number = 10, token?: string): Promise<{ data: ActivityLog[]; total: number }> => {
    try {
      const url = `${API.activityLogs}/user/${userId}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { tags: ["activity-logs"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar logs por usuário:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findByEntity: async (entidade: string, entidadeId: number, page: number = 1, limit: number = 10, token?: string): Promise<{ data: ActivityLog[]; total: number }> => {
    try {
      const url = `${API.activityLogs}/${entidade}/${entidadeId}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        next: { tags: ["activity-logs"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar logs por entidade:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },
};