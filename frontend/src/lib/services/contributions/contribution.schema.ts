export const ContributionCreateFormSchema = z.object({
  member_id: z.number().min(1, "Selecione um membro"),
  tipo: z.enum(["DIZIMO", "OFERTA_DINHEIRO", "OFERTA_BEM", "DOACAO"]),
  valor: z.number().optional(),
  data_contribuicao: z.string().optional(),
  evento_id: z.number().optional(),
  metodo: z.string().optional(),
  finalidade: z.string().optional(),
  observacao: z.string().optional(),
  details: z
    .object({
      descricao: z.string().optional(),
      valor_estimado: z.number().optional(),
      status: z.string().optional(),
      observacao: z.string().optional(),
    })
    .optional(),
});

export const ContributionEditFormSchema = ContributionCreateFormSchema.extend({
  id: z.number().min(1, "ID é obrigatório"),
});

export type ContributionCreateFormData = z.infer<typeof ContributionCreateFormSchema>;
export type ContributionEditFormData = z.infer<typeof ContributionEditFormSchema>;