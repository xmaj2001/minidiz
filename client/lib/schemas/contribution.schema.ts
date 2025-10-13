import { format } from "date-fns";
import z from "zod";


const PAYMENT_METHODS = [
  "DINHEIRO",
  "EXPRESS",
  "CARTAO",
  "TRANSFERENCIA",
  "CHEQUE",
  "OUTRO",
] as const;

const PAYMENT_METHODS_2 = [
  "NENHUM",
  "DINHEIRO",
  "EXPRESS",
  "CARTAO",
  "TRANSFERENCIA",
  "CHEQUE",
  "OUTRO",
] as const;
const CONTRIBUTION_STATUSES = ["PENDENTE", "RECEBIDO", "CANCELADO"] as const;

const dateStringTransformer = z.string().transform((str, ctx) => {
  const date = new Date(str);
  if (isNaN(date.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Data inválida ou formato incorreto.",
    });
    return z.NEVER;
  }
  return date;
});

export const createDizimoSchema = z.object({
  evento_id: z.number().int().positive().optional(),
  member_id: z
    .number()
    .int()
    .positive()
    .refine((val) => val > 0, {
      message: "O ID do membro contribuinte é obrigatório.",
    }),
  valor: z
    .number({ error: "O valor deve ser um número." })
    .positive({ message: "O valor deve ser positivo e maior que zero." })
    .refine((val) => val >= 0.01, {
      message: "O valor deve ser maior que zero.",
    }),
  data: z.union([z.date(), dateStringTransformer], { 
    error: "A data da contribuição é obrigatória.",
  }),
  metodo: z.enum(PAYMENT_METHODS, {
    message: `Método de pagamento inválido.`,
  }),
  finalidade: z.string().optional(),
  observacao: z.string().optional(),
  status: z.enum(CONTRIBUTION_STATUSES, {
    message: `Status inválido.`,
  }).default("PENDENTE"),
  created_by: z
    .number()
    .int()
    .positive()
}).transform((data) => ({
    // Transforma a data de Date (do formulário) para string ISO (para a API)
    ...data,
    data: format(data.data, "yyyy-MM-dd"), 
}));

export type FormCreateDizimo = z.infer<typeof createDizimoSchema>;

export const createOfertaSchema = z
  .object({
    evento_id: z
      .number({
        error: "O ID do evento deve ser um número inteiro, se aplicável.",
      })
      .int({ message: "O ID do evento deve ser um número inteiro." })
      .positive({ message: "O ID do evento deve ser positivo." })
      .optional(),
    member_id: z
      .number({
        error: "O ID do membro deve ser um número inteiro.",
      })
      .int({ message: "O ID do membro deve ser um número inteiro." })
      .positive({ message: "O ID do membro deve ser positivo." })
      .refine((val) => val > 0, {
        message: "O ID do membro contribuinte é obrigatório.",
      }),
    valor: z
      .number({ error: "O valor deve ser um número." })
      .positive({ message: "O valor deve ser positivo e maior que zero." })
      .optional(),
    data: z
      .string({ error: "A data da contribuição é obrigatória." })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "A data deve estar no formato ISO 8601 (AAAA-MM-DD).",
      }),
    metodo: z.enum(PAYMENT_METHODS_2, {
      message: `Método de pagamento inválido. Use: ${PAYMENT_METHODS_2.join(
        ", "
      )}`,
    }),
    finalidade: z.string().optional(),
    observacao: z.string().optional(),
    descricao: z.string().optional(),
    imagens: z
      .array(
        z.string({
          error: "Cada item em imagens deve ser uma string de URL.",
        })
      )
      .optional(),
    status: z
      .enum(CONTRIBUTION_STATUSES, {
        message: `Status inválido. Use: ${CONTRIBUTION_STATUSES.join(", ")}`,
      })
      .optional(),
    tipoObjeto: z.string().optional(),
    created_by: z
      .number({
        error: "O ID do usuário que registrou deve ser um número.",
      })
      .int({
        message: "O ID do usuário que registrou deve ser um número inteiro.",
      })
      .positive({ message: "O ID do usuário que registrou deve ser positivo." })
      .optional(),
  })
  .refine(
    (data) =>
      data.valor !== undefined ||
      data.descricao !== undefined ||
      data.tipoObjeto !== undefined,
    {
      message: "Para ofertas, informe o valor ou a descrição/tipo do objeto.",
      path: ["valor"],
    }
  );

export type FormCreateOferta = z.infer<typeof createOfertaSchema>;

export const createDoacaoSchema = z
  .object({
    evento_id: z
      .number({
        error:
          "O ID do evento deve ser um número inteiro, se aplicável.",
      })
      .int({ message: "O ID do evento deve ser um número inteiro." })
      .positive({ message: "O ID do evento deve ser positivo." })
      .optional(),
    member_id: z
      .number({
        error: "O ID do membro deve ser um número inteiro.",
      })
      .int({ message: "O ID do membro deve ser um número inteiro." })
      .positive({ message: "O ID do membro deve ser positivo." })
      .refine((val) => val > 0, {
        message: "O ID do membro contribuinte é obrigatório.",
      }),
    valor: z
      .number({ error: "O valor deve ser um número." })
      .positive({ message: "O valor deve ser positivo e maior que zero." })
      .refine((val) => val >= 0.01, {
        message: "O valor deve ser maior que zero.",
      })
      .optional(),
    data: z
      .string({ error: "A data da contribuição é obrigatória." })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "A data deve estar no formato ISO 8601 (AAAA-MM-DD).",
      }),
    metodo: z.enum(PAYMENT_METHODS_2, {
      message: `Método de pagamento inválido. Use: ${PAYMENT_METHODS_2.join(
        ", "
      )}`,
    }),
    finalidade: z.string().optional(),
    observacao: z.string().optional(),
    descricao: z.string().optional(),
    imagens: z
      .array(
        z.string({
          error:
            "Cada item em imagens deve ser uma string de URL.",
        })
      )
      .optional(),
    status: z
      .enum(CONTRIBUTION_STATUSES, {
        message: `Status inválido. Use: ${CONTRIBUTION_STATUSES.join(", ")}`,
      })
      .optional(),
    tipoObjeto: z.string().optional(),
    created_by: z
      .number({
        error: "O ID do usuário que registrou deve ser um número.",
      })
      .int({
        message: "O ID do usuário que registrou deve ser um número inteiro.",
      })
      .positive({ message: "O ID do usuário que registrou deve ser positivo." })
      .optional(),
  })
  .refine(
    (data) =>
      data.valor !== undefined ||
      data.descricao !== undefined ||
      data.tipoObjeto !== undefined,
    {
      message: "Para doações, informe o valor ou a descrição/tipo do objeto.",
      path: ["valor"],
    }
  );

export type FormCreateDoacao = z.infer<typeof createDoacaoSchema>;

export const updateDizimoSchema = z.object({
  evento_id: z
    .number({
      error: "O ID do evento deve ser um número inteiro.",
    })
    .int({ message: "O ID do evento deve ser um número inteiro." })
    .positive({ message: "O ID do evento deve ser positivo." })
    .optional(),
  member_id: z
    .number({
      error: "O ID do membro deve ser um número inteiro.",
    })
    .int({ message: "O ID do membro deve ser um número inteiro." })
    .positive({ message: "O ID do membro deve ser positivo." })
    .optional(),
  valor: z
    .number({ error: "O valor deve ser um número." })
    .positive({ message: "O valor deve ser positivo e maior que zero." })
    .refine((val) => val >= 0.01, {
      message: "O valor deve ser maior que zero.",
    })
    .optional(),
  data: z
    .string({ error: "A data deve estar no formato ISO 8601." })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "A data deve estar no formato ISO 8601 (AAAA-MM-DD).",
    })
    .optional(),
  metodo: z
    .enum(PAYMENT_METHODS, {
      message: `Método de pagamento inválido. Use: ${PAYMENT_METHODS.join(
        ", "
      )}`,
    })
    .optional(),
  status: z
    .enum(CONTRIBUTION_STATUSES, {
      message: `Status inválido. Use: ${CONTRIBUTION_STATUSES.join(", ")}`,
    })
    .optional(),
  finalidade: z.string().optional(),
  observacao: z.string().optional(),
});

export type FormUpdateDizimo = z.infer<typeof updateDizimoSchema>;

export const updateOfertaSchema = z.object({
  evento_id: z
    .number({
      error: "O ID do evento deve ser um número inteiro.",
    })
    .int({ message: "O ID do evento deve ser um número inteiro." })
    .positive({ message: "O ID do evento deve ser positivo." })
    .optional(),
  member_id: z
    .number({
      error: "O ID do membro deve ser um número inteiro.",
    })
    .int({ message: "O ID do membro deve ser um número inteiro." })
    .positive({ message: "O ID do membro deve ser positivo." })
    .optional(),
  valor: z
    .number({ error: "O valor deve ser um número." })
    .positive({ message: "O valor deve ser positivo e maior que zero." })
    .refine((val) => val >= 0.01, {
      message: "O valor deve ser maior que zero.",
    })
    .optional(),
  data: z
    .string({ error: "A data deve estar no formato ISO 8601." })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "A data deve estar no formato ISO 8601 (AAAA-MM-DD).",
    })
    .optional(),
  metodo: z
    .enum(PAYMENT_METHODS, {
      message: `Método de pagamento inválido. Use: ${PAYMENT_METHODS.join(
        ", "
      )}`,
    })
    .optional(),
  status: z
    .enum(CONTRIBUTION_STATUSES, {
      message: `Status inválido. Use: ${CONTRIBUTION_STATUSES.join(", ")}`,
    })
    .optional(),
  finalidade: z.string().optional(),
  observacao: z.string().optional(),
  descricao: z.string().optional(),
  imagens: z
    .array(
      z.string({
        error: "Cada item em imagens deve ser uma string de URL.",
      })
    )
    .optional(),
  tipoObjeto: z.string().optional(),
});

export type FormUpdateOferta = z.infer<typeof updateOfertaSchema>;

export const updateDoacaoSchema = z.object({
  evento_id: z
    .number({
      error: "O ID do evento deve ser um número inteiro.",
    })
    .int({ message: "O ID do evento deve ser um número inteiro." })
    .positive({ message: "O ID do evento deve ser positivo." })
    .optional(),
  member_id: z
    .number({
      error: "O ID do membro deve ser um número inteiro.",
    })
    .int({ message: "O ID do membro deve ser um número inteiro." })
    .positive({ message: "O ID do membro deve ser positivo." })
    .optional(),
  valor: z
    .number({ error: "O valor deve ser um número." })
    .positive({ message: "O valor deve ser positivo e maior que zero." })
    .refine((val) => val >= 0.01, {
      message: "O valor deve ser maior que zero.",
    })
    .optional(),
  data: z
    .string({ error: "A data deve estar no formato ISO 8601." })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "A data deve estar no formato ISO 8601 (AAAA-MM-DD).",
    })
    .optional(),
  metodo: z
    .enum(PAYMENT_METHODS, {
      message: `Método de pagamento inválido. Use: ${PAYMENT_METHODS.join(
        ", "
      )}`,
    })
    .optional(),
  status: z
    .enum(CONTRIBUTION_STATUSES, {
      message: `Status inválido. Use: ${CONTRIBUTION_STATUSES.join(", ")}`,
    })
    .optional(),
  finalidade: z.string().optional(),
  observacao: z.string().optional(),
  descricao: z.string().optional(),
  imagens: z
    .array(
      z.string({
        error: "Cada item em imagens deve ser uma string de URL.",
      })
    )
    .optional(),
  tipoObjeto: z.string().optional(),
});

export type FormUpdateDoacao = z.infer<typeof updateDoacaoSchema>;
