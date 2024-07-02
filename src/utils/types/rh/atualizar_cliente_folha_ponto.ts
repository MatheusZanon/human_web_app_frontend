import { z } from "zod";

export const updateSchema = z.object({
    id: z.string(),
    id_cliente: z.string(),
    registrado: z.boolean(),
    colaborador: z.boolean(),
});

export type UpdateSchemaType = z.infer<typeof updateSchema>;