import z from "zod";

export const createMemberSchema = z
  .object({
    nome: z.string().min(1, "O primeiro nome é obrigatório."),
    sobreNome: z.string().min(1, "O sobrenome é obrigatório."),
    email: z
      .string()
      .email("O email deve ser válido (ex: membro@igreja.com)")
      .optional()
      .or(z.literal("")),
    telefone: z
      .string()
      .min(9, "O telefone deve conter pelo menos 9 dígitos.")
      .optional()
      .or(z.literal("")),
    data_nascimento: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message:
          "A data de nascimento deve estar em um formato válido (AAAA-MM-DD).",
      }),
    endereco: z.string().optional(),
    observacoes: z.string().optional(),
    status: z.enum(["ATIVO", "INATIVO", "PENDENTE"], {
      required_error: "O status é obrigatório.",
    }),
    genero: z.enum(["MASCULINO", "FEMININO", "OUTRO", "NAO_INFORMADO"], {
      required_error: "O gênero é obrigatório.",
    }),
  })
  .refine((data) => data.email || data.telefone, {
    message: "É necessário informar pelo menos um contato (email ou telefone).",
    path: ["email"], // aplica no campo email, mas poderia ser em telefone
  });

export type FormCreateMember = z.infer<typeof createMemberSchema>;