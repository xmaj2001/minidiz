import { z } from 'zod';

// Schema para criar um pagamento
export const CreatePaymentSchema = z.object({
  memberId: z.number({message:"O id do membro que vai fazer a oferta ou o dizimo é necessario"}).positive(),
  type: z.enum(['tithe', 'offering']),
  amount: z.number().positive(),
  date: z.string().datetime(),
  description: z.string().optional(),
});

// Schema para atualizar um pagamento
export const UpdatePaymentSchema = z.object({
  amount: z.number().positive().optional(),
  description: z.string().optional(),
});

export const PaginationPaymentSchema = z.object({
  page: z.number().positive().min(1, "É esperado numinimo 1 pagina"),
  numberItens: z.number().positive().max(100, "É esperado no maximo 100 itens por pagina"),
}).optional();

export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
export type UpdatePaymentDto = z.infer<typeof UpdatePaymentSchema>;
export type PaginationPayment = z.infer<typeof PaginationPaymentSchema>;

// import { z } from 'zod';

// export const PaymentSchema = z.object({
//   id: z.string().uuid(),
//   userId: z.string().uuid(),
//   memberId: z.string().uuid(),
//   type: z.number().int().min(0).default(0),
//   value: z.number().int().positive(),
//   date: z.date().nullable().optional(),
//   createdAt: z.date(),
//   updatedAt: z.date(),
// });

// export const CreatePaymentSchema = z.object({
//   userId: z.string().uuid({ message: 'ID do usuário deve ser um UUID válido' }),
//   memberId: z
//     .string()
//     .uuid({ message: 'ID do membro deve ser um UUID válido' }),
//   type: z.number().int().min(0).default(0).optional(),
//   value: z
//     .number()
//     .int()
//     .positive({ message: 'O valor deve ser um número inteiro positivo' }),
//   date: z.date().nullable().optional(),
// });

// export const UpdatePaymentSchema = z.object({
//   type: z.number().int().min(0).optional(),
//   value: z
//     .number()
//     .int()
//     .positive({ message: 'O valor deve ser um número inteiro positivo' })
//     .optional(),
//   date: z.date().nullable().optional(),
// });

// export type PaymentDto = z.infer<typeof PaymentSchema>;
// export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>;
// export type UpdatePaymentDto = z.infer<typeof UpdatePaymentSchema>;
