import { criarRoboSchema } from '@/components/robos/criar-robo';
import { z } from 'zod';

type CriarRoboType = z.infer<typeof criarRoboSchema>;

export { type CriarRoboType };
