import { z } from "zod";

export const MemberCreateFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  address: z.string().optional(),
  status: z.string().optional(),
  details: z
    .object({
      data_batismo: z.string().optional(),
      data_comunhao: z.string().optional(),
      data_crisma: z.string().optional(),
      estado_civil: z.string().optional(),
      observacao: z.string().optional(),
    })
    .optional(),
});

export const MemberEditFormSchema = MemberCreateFormSchema.extend({
  id: z.string().min(1, "ID é obrigatório"),
});

export type MemberCreateFormData = z.infer<typeof MemberCreateFormSchema>;
export type MemberEditFormData = z.infer<typeof MemberEditFormSchema>;