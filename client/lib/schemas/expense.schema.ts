import { z } from "zod";
import {
  ExpenseCategory,
  ExpenseStatus,
  PaymentMethod,
} from "../interfaces/expense.interface";

export const ExpenseSchema = z.object({
  id: z.number().optional(),
  descricao: z
    .string()
    .min(1, { message: "A descrição da despesa é obrigatória." }),
  valor: z
    .number({ error: "O valor da despesa deve ser um número." })
    .positive({ message: "O valor da despesa deve ser positivo." }),
  data: z.string().date({ message: "A data da despesa é obrigatória." }),
  categoria: z.enum(
    Object.values(ExpenseCategory) as [ExpenseCategory, ...ExpenseCategory[]],
    {
      error: () => "A categoria da despesa é inválida.",
    }
  ),
  status: z.enum(
    Object.values(ExpenseStatus) as [ExpenseStatus, ...ExpenseStatus[]],
    {
      error: () => "O status da despesa é inválido.",
    }
  ),
  forma_pagamento: z.enum(
    Object.values(PaymentMethod) as [PaymentMethod, ...PaymentMethod[]],
    {
      error: () => "A forma de pagamento da despesa é inválida.",
    }
  ),
  fornecedor: z.string().optional().nullable(),
  observacao: z.string().optional().nullable(),
  created_by: z.number(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export type ExpenseInput = z.infer<typeof ExpenseSchema>;

export const CreateExpenseSchema = ExpenseSchema.pick({
  descricao: true,
  valor: true,
  data: true,
  categoria: true,
  status: true,
  forma_pagamento: true,
  observacao: true,
  created_by: true,
});

export type FormCreateExpense = z.infer<typeof CreateExpenseSchema>;

export const UpdateExpenseSchema = ExpenseSchema.partial().omit({
  id: true,
  created_by: true,
  created_at: true,
  updated_at: true,
});

export type UpdateExpenseInput = z.infer<typeof UpdateExpenseSchema>;

export const ExpenseQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, { message: "A página deve ser maior que zero." }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, {
      message: "O limite deve ser entre 1 e 100.",
    }),
  search: z.string().optional(),
  categoria: z.nativeEnum(ExpenseCategory).optional(),
  status: z.nativeEnum(ExpenseStatus).optional(),
  data_inicio: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "A data de início deve ser uma data válida.",
    }),
  data_fim: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "A data de fim deve ser uma data válida.",
    }),
});

export type ExpenseQueryInput = z.infer<typeof ExpenseQuerySchema>;

export const ListaExpensesSchema = z.object({
  items: z.array(ExpenseSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type ListaExpenses = z.infer<typeof ListaExpensesSchema>;
