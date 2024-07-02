import { api } from "@/utils/axios";
import { CriarRoboType } from "@/utils/types/robos/criar_robo";
import { Robo } from "@/utils/types/robos/robo";

export async function postRobos(data: CriarRoboType) {
  const res = await api.post<Robo>('robos/', data).then((res) => res.data);
  return res;
}