import { z } from "zod";

export const addSchema = z.object({
    id_clientes: z.array(z.string()),
});

export type AddSchemaType = z.infer<typeof addSchema>;