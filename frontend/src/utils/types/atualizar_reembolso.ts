import { z } from 'zod';
import { criarReembolsoSchema } from './criar_reembolso';

const atualizarReembolsoSchema = criarReembolsoSchema.omit({ nome_razao_social: true }).extend({
    id: z.coerce.number().min(1, 'Este campo é obrigatório'),
});
type AtualizarReembolsoType = z.infer<typeof atualizarReembolsoSchema>;

export { atualizarReembolsoSchema };
export type { AtualizarReembolsoType };
