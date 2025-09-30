import { API } from "@/config/settings";
import {CreateExpenseData, UpdateExpenseData, Expense} from "./expense.interface"

export const ExpenseServices = {
  create: async (data: CreateExpenseData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(API.expenses, {
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

      console.error("Erro ao criar despesa:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  update: async (id: number, data: UpdateExpenseData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.expenses}/${id}`, {
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

      console.error("Erro ao atualizar despesa:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  listPaginate: async (page: number = 1, limit: number = 10): Promise<{ data: Expense[]; total: number }> => {
    try {
      const url = `${API.expenses}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["expenses"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar despesas:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findOne: async (id: number): Promise<Expense | null> => {
    try {
      const res = await fetch(`${API.expenses}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["expenses"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar despesa:", data);
      return null;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  },

  remove: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.expenses}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.status === 200 || res.status === 204) {
        return true;
      }

      console.error("Erro ao deletar despesa:", await res.json());
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },
};