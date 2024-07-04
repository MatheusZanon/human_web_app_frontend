import { z } from 'zod';

const criarOptionSchema = z.object({
    select_id: z.union([z.string().pipe(z.coerce.number().min(1, 'Este campo é obrigatório')), z.number()]),
    option_name: z.string().min(1, 'Este campo é obrigatório'),
});

type CriarOptionType = z.infer<typeof criarOptionSchema>;

export { criarOptionSchema, type CriarOptionType };
