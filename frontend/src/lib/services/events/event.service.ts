import { API } from "@/config/settings";
import {CreateEventData, UpdateEventData, AddAttendanceData, Event} from "./event.interface"

export const EventServices = {
  create: async (data: CreateEventData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(API.events, {
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

      console.error("Erro ao criar evento:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  update: async (id: number, data: UpdateEventData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.events}/${id}`, {
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

      console.error("Erro ao atualizar evento:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  listPaginate: async (page: number = 1, limit: number = 10): Promise<{ data: Event[]; total: number }> => {
    try {
      const url = `${API.events}?page=${page}&limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["events"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao listar eventos:", data);
      return { data: [], total: 0 };
    } catch (error) {
      console.error("Erro na requisição:", error);
      return { data: [], total: 0 };
    }
  },

  findById: async (id: number): Promise<Event | null> => {
    try {
      const res = await fetch(`${API.events}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { tags: ["events"] },
      });

      const data = await res.json();
      if (res.status === 200) {
        return data;
      }

      console.error("Erro ao buscar evento:", data);
      return null;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return null;
    }
  },

  remove: async (id: number, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.events}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (res.status === 200 || res.status === 204) {
        return true;
      }

      console.error("Erro ao deletar evento:", await res.json());
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },

  addAttendance: async (data: AddAttendanceData, token?: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API.events}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      const res_data = await res.json();
      console.log("Data attendance:", data, "Response:", res_data);

      if (res.status === 200 || res.status === 201) {
        return true;
      }

      console.error("Erro ao adicionar presença:", res_data);
      return false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  },
};