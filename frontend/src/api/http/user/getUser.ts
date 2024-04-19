import axios from 'axios';
import { User } from '@/utils/types/user';

export async function getUser() {
  const data = await axios.get<User>('http://localhost:8000/api/user/login', {withCredentials: true}).then((res) => res.data);
  return data;
}
