interface parametroInfo {
  id: string;
  nome: string;
  tipo: string;
  created_at: string;
  updated_at: string;
}

export interface RoboParametros {
  id: string;
  robo_id: string;
  parametro_id: string;
  valor: string;
  parametro_info: parametroInfo;
  created_at: string;
  updated_at: string;
}