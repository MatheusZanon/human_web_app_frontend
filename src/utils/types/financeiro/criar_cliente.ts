import { newClienteFormSchema } from '@/pages/financeiro/clientes';
import { z } from 'zod';

type CriarClienteType = z.infer<typeof newClienteFormSchema>;

export { type CriarClienteType };
