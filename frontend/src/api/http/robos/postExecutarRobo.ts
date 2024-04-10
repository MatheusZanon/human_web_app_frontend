import { api } from '@/utils/axios';

export type RoboParametrosType = {
    [x: string]: unknown;
};

export async function postExecutarRobo({ roboId, data }: { roboId: string; data: RoboParametrosType }) {
    const token = localStorage.getItem('accessToken');
    const response = await api
        .post(`robos/${roboId}/executar/`, data, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => res.data);
    return response;
}
