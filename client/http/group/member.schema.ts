import z from "zod";

export const SchemaRegisterMember = z
  .object({
    name: z.string().min(1, "O completo nome é obrigatório."),
    email: z
      .string()
      .email("O email deve ser válido (ex: membro@igreja.com)")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .min(9, "O telefone deve conter pelo menos 9 dígitos.")
      .optional()
      .or(z.literal("")),
    birth: z
      .string()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message:
          "A data de nascimento deve estar em um formato válido (AAAA-MM-DD).",
      }),
    gender: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
      message: "O gênero é obrigatório.",
    }),

    maritalStatus: z
      .enum(["CASADO", "SOLTEIRO", "VIUVO", "VIUVA"], {
        message: "O estado civíl é obrigatório.",
      }),
    isBaptized: z.boolean({message:"É necessário informar se é basido ao não"}),
    isConfirmed: z.boolean({message:"É necessário informar se é basido ao não"})
  })
  .refine((data) => data.email || data.phone, {
    message:
      "É necessário informar pelo menos um contato (email ou Numero do telefone).",
    path: ["email"],
  });

export type FormDataRegisterMember = z.infer<typeof SchemaRegisterMember>;
