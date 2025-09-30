import { z } from "zod";

export const ExpenseCreateFormSchema = z.object({
  descricao: z.string().min(1, "Descrição é obrigatória"),
  valor: z.number().min(0, "Valor deve ser maior ou igual a zero"),
  data: z.string().optional(),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  evento_id: z.number().optional(),
  employee_id: z.number().optional(),
  observacao: z.string().optional(),
});

export const ExpenseEditFormSchema = ExpenseCreateFormSchema.extend({
  id: z.number().min(1, "ID é obrigatório"),
});

export type ExpenseCreateFormData = z.infer<typeof ExpenseCreateFormSchema>;
export type ExpenseEditFormData = z.infer<typeof ExpenseEditFormSchema>;