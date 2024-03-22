import { api } from "@/utils/axios";
import { Robo } from "@/utils/types/robo";

export async function deleteRobos() {
  const data = await api.delete<Robo[]>('robos').then((res) => res.data);
  window.location.reload();
  return data;
}