import { API, ApiResponse } from "@/config/settings";
import {
  CreateContributionData,
  UpdateContributionData,
  IContribution,
  ContributionType,
} from "../interfaces/contribution.interface";

export const ContributionServices = {
  create: async (
    data: CreateContributionData,
    userId: number,
    token?: string
  ): Promise<ApiResponse<IContribution | null>> => {
    try {
      const res = await fetch(API.contributions, {
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
          message: "Contribution Create",
          error: null,
        };
      }

      console.error("Erro ao criar contribuição:", res_data);
      return {
        result: null,
        error: res_data.errors ? res_data : null,
        success: false,
        message: res_data.message as string | "Erro ao criar contribuição",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        result: null,
        success: false,
        error: null,
        message: "Erro ao criar contribuição",
      };
    }
  },

  update: async (
    id: number,
    data: UpdateContributionData,
    token?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API.contributions}/${id}`, {
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

      console.error("Erro ao atualizar contribuição:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  listPaginate: async (
    type: ContributionType,
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IContribution[]>> => {
    try {
      const url = `${API.contributions}?page=${page}&limit=${limit}&type=${type}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["contributions"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return { result: data, success: true, message: "" };
      }

      return {
        result: [],
        success: false,
        message: "Erro ao listar contribuições:",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição:" };
    }
  },

  findById: async (id: number): Promise<IContribution | null> => {
    try {
      const res = await fetch(`${API.contributions}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["contributions"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar contribuição:", data);
      return null;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  },

  remove: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.contributions}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.status === 200 || res.status === 204) {
        return true;
      }

      console.error("Erro ao deletar contribuição:", await res.json());
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
  ): Promise<{ data: IContribution[]; total: number }> => {
    try {
      const url = `${API.contributions}/search?query=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["contributions"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar contribuições:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },
};
