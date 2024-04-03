import { z } from "zod";

const criarRotinaSchema = z.object({
  nome: z.string().min(1, 'Este campo é obrigatório'),
});

type CriarRotinaType = z.infer<typeof criarRotinaSchema>;

export { criarRotinaSchema, type CriarRotinaType }