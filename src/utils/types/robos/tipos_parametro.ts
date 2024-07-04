import { z } from "zod";

const tiposParametroEnum = z.enum([
  'TEXT',
  'INTEGER',
  'FLOAT',
  'BOOLEAN',
  'DATE',
  'CENTRO_DE_CUSTO',
]);

type TiposParametroType = z.infer<typeof tiposParametroEnum>;

export { tiposParametroEnum, type TiposParametroType }