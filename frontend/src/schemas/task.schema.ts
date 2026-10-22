import { z } from "zod";

export const taskSchema = z.object({
  body: z.string().min(1, "Task body is required"),
  completed: z.boolean().optional(),
});

export type TaskSchemaType = z.infer<typeof taskSchema>;
