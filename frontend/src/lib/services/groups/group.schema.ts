import { z } from "zod";

export const GroupCreateFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  lider_id: z.number().optional(),
  descricao: z.string().optional(),
});

export const GroupEditFormSchema = GroupCreateFormSchema.extend({
  id: z.number().min(1, "ID é obrigatório"),
});

export const GroupMemberFormSchema = z.object({
  group_id: z.number().min(1, "Grupo é obrigatório"),
  member_id: z.number().min(1, "Membro é obrigatório"),
});

export type GroupCreateFormData = z.infer<typeof GroupCreateFormSchema>;
export type GroupEditFormData = z.infer<typeof GroupEditFormSchema>;
export type GroupMemberFormData = z.infer<typeof GroupMemberFormSchema>;