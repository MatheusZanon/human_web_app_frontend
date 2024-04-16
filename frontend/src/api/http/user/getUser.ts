import axios from 'axios';
import { User } from '@/utils/types/user';

export async function getUser() {
  const token = localStorage.getItem('accessToken');
  const data = await axios.get<User>('http://localhost:8000/api/user/login', {headers: {Authorization: `Bearer ${token}`}}).then((res) => res.data);
  return data;
}
