import { api } from "@/utils/axios";
import { CriarRoboType } from "@/utils/types/criar_robo";
import { Robo } from "@/utils/types/robo";

export async function postRobos(data: CriarRoboType) {
  const token = localStorage.getItem('accessToken');
  const res = await api.post<Robo>('robos/', data, {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
  return res;
}