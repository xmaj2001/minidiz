import { z } from "zod";

export const EventCreateFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  data: z.string().min(1, "Data é obrigatória"),
  tipo: z.string().min(1, "Tipo é obrigatório"),
  grupo_id: z.number().optional(),
  observacao: z.string().optional(),
});

export const EventEditFormSchema = EventCreateFormSchema.extend({
  id: z.number().min(1, "ID é obrigatório"),
});

export const EventAttendanceFormSchema = z.object({
  event_id: z.number().min(1, "Evento é obrigatório"),
  member_id: z.number().min(1, "Membro é obrigatório"),
});

export type EventCreateFormData = z.infer<typeof EventCreateFormSchema>;
export type EventEditFormData = z.infer<typeof EventEditFormSchema>;
export type EventAttendanceFormData = z.infer<typeof EventAttendanceFormSchema>;