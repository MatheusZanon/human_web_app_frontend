import { z } from "zod";

const tiposParametroEnum = z.enum([
  'TEXT',
  'INTEGER',
  'FLOAT',
  'BOOLEAN',
  'DATE',
]);

type TiposParametroType = z.infer<typeof tiposParametroEnum>;

export { tiposParametroEnum, type TiposParametroType }