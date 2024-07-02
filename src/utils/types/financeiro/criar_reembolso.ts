import { z } from 'zod';

const criarReembolsoSchema = z.object({
    mes: z.union([
        z.string().pipe(z.coerce.number().min(1, 'Este campo é obrigatório')),
        z.number().min(1, 'Este campo é obrigatório'),
    ]),
    ano: z.union([
        z.string().pipe(z.coerce.number().min(1, 'Este campo é obrigatório')),
        z.number().min(1, 'Este campo é obrigatório'),
    ]),
    nome_razao_social: z.string().min(1, 'Este campo é obrigatório'),
    descricao: z.string().min(1, 'Este campo é obrigatório'),
    valor: z.union([
        z.string().pipe(z.coerce.number().min(1, 'Este campo é obrigatório')),
        z.number().min(1, 'Este campo é obrigatório'),
    ]),
});

type CriarReembolsoType = z.infer<typeof criarReembolsoSchema>;

export { criarReembolsoSchema };
export type { CriarReembolsoType };
