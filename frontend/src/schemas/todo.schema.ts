import { z } from "zod";

export const todoSchema = z.object({
  body: z.string().min(1, "Todo body is required"),
  completed: z.boolean().optional(),
});

export type TodoSchemaType = z.infer<typeof todoSchema>;
