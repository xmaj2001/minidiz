import { z } from 'zod';

export const CreateMemberSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido').optional(),
  phone: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export const UpdateMemberSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  email: z.string().email('E-mail inválido').optional(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  birthDate: z.string().datetime().optional(),
  status: z.enum(['active', 'inactive']).optional(),
});

export type CreateMemberDto = z.infer<typeof CreateMemberSchema>;
export type UpdateMemberDto = z.infer<typeof UpdateMemberSchema>;