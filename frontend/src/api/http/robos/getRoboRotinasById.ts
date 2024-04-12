import { api } from "@/utils/axios";
import RoboRotina from "@/utils/types/robo_rotinas";

export async function getRoboRotinasById({ robo_id }: { robo_id: string }) {
  const data = await api.get<RoboRotina[]>(`robos/${robo_id}/rotinas`).then((res) => res.data);
  return data;
}