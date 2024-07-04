import { api } from '@/utils/axios';
import { CriarOptionType } from '@/utils/types/robos/criar_option';
import { SelectOption } from '@/utils/types/robos/option';
export async function postOption(roboId: number, data: CriarOptionType) {
    console.log(api.getUri() + `robos/${roboId}/parametros/criar-option/`, data);
    const res = await api.post<SelectOption>(`robos/${roboId}/parametros/criar-option/`, data).then((res) => res.data);
    return res;
}
