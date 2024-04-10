import { Parametro } from './parametro';

export interface RoboParametros {
    id: string;
    robo_id: string;
    parametro_id: string;
    valor: string;
    parametro_info: Parametro;
    created_at: string;
    updated_at: string;
}
