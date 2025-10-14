import { API, ApiResponse } from "@/config/settings";
import {
  CreateExpenseData,
  IExpense,
  UpdateExpenseData,
} from "../interfaces/expense.interface";

export const ExpenseServices = {
  create: async (
    data: CreateExpenseData,
    userId: number,
    token?: string
  ): Promise<ApiResponse<IExpense | null>> => {
    try {
      const res = await fetch(API.expenses, {
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
          message: "Expense Create",
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
    data: UpdateExpenseData,
    token?: string
  ): Promise<boolean> => {
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

      console.error("Erro ao atualizar despesas:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  listPaginate: async (
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<IExpense[]>> => {
    try {
      const url = `${API.expenses}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["Expenses"] },
      });

      let data: IExpense[] = await res.json();
      if (res.status === 200) {
        data = data.map((item) => ({
          ...item,
          valor: Number(item.valor),
        }));
        return { result: data, success: true, message: "" };
      }

      return {
        result: [],
        success: false,
        message: "Erro ao listar dispesas:",
      };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição:" };
    }
  },

  findById: async (id: number): Promise<IExpense | null> => {
    try {
      const res = await fetch(`${API.expenses}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["Expenses"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar dispesas:", data);
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

      console.error("Erro ao deletar dispesas:", await res.json());
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
  ): Promise<ApiResponse<IExpense | []>> => {
    try {
      const url = `${API.expenses}/search?q=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["Expenses"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return {
          result: data,
          success: true,
          message: "Data obitidos com sucesso",
        };
      }

      console.error("Erro ao buscar dispesas:", data);
      return { result: [], success: false, message: "Erro ao buscar dispesas" };
    } catch (error) {
      console.log("Erro na requisição:", error);
      return { result: [], success: false, message: "Erro na requisição" };
    }
  },
};
