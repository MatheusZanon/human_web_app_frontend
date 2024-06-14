import { z } from "zod";

export const removeSchema = z.object({
    id: z.string(),
});

export type RemoveSchemaType = z.infer<typeof removeSchema>;