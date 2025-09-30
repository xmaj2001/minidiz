import { API } from "@/config/settings";
import {CreateContributionData, UpdateContributionData, Contribution} from "./contribution.interface"

export const ContributionServices = {
  create: async (data: CreateContributionData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(API.contributions, {
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

      console.error("Erro ao criar contribuição:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  update: async (id: number, data: UpdateContributionData, token?: string): Promise<boolean> => {
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

  listPaginate: async (page: number = 1, limit: number = 10): Promise<{ data: Contribution[]; total: number }> => {
    try {
      const url = `${API.contributions}?page=${page}&limit=${limit}`;
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

      console.error("Erro ao listar contribuições:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findById: async (id: number): Promise<Contribution | null> => {
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

  uploadImages: async (contributionId: number, files: File[], token?: string): Promise<string[]> => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });

      const res = await fetch(`${API.contributions}/${contributionId}/upload-images`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      const data = await res.json();
      if (res.status === 200 || res.status === 201) {
        return data.imagens; // Assume que o backend retorna as URLs das imagens
      }

      console.error("Erro ao fazer upload de imagens:", data);
      return [];
    } catch (error) {
      console.error("Erro na requisição:", error);
      return [];
    }
  },
};