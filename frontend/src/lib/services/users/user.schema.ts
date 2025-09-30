import { z } from "zod";

export const UserCreateFormSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  permissao: z.enum(["ADMIN", "TESOUREIRO", "VISUALIZADOR"]),
});

export const UserEditFormSchema = z.object({
  id: z.number().min(1, "ID é obrigatório"),
  nome: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  permissao: z.enum(["ADMIN", "TESOUREIRO", "VISUALIZADOR"]).optional(),
});

export type UserCreateFormData = z.infer<typeof UserCreateFormSchema>;
export type UserEditFormData = z.infer<typeof UserEditFormSchema>;