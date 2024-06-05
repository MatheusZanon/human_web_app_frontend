import { z } from 'zod';
import { tiposParametroEnum } from './tipos_parametro';

const criarParametroSchema = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório'),
    tipo: tiposParametroEnum,
});

type CriarParametroType = z.infer<typeof criarParametroSchema>;

export { criarParametroSchema, type CriarParametroType };
