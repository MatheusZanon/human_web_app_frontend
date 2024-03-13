import { api } from "@/utils/axios";
import { Robo } from "@/utils/types/robo";

export async function postRobos() {
  const data = await api.post<Robo[]>('robos/').then((res) => res.data);
  console.log(data)
  return data;
}