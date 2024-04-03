import { z } from 'zod';
import { criarRoboSchema } from '@/pages/robos/criar_robo';

type CriarRoboType = z.infer<typeof criarRoboSchema>;

export { type CriarRoboType };
