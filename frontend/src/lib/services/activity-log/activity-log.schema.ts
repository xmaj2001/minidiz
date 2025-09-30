import { z } from "zod";

export const ActivityLogFilterSchema = z.object({
  user_id: z.number().optional(),
  entidade: z.string().optional(),
  entidade_id: z.number().optional(),
});

export type ActivityLogFilterData = z.infer<typeof ActivityLogFilterSchema>;