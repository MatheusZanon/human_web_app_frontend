import { useCriarParametro } from '@/api/http';
import { criarParametroSchema, CriarParametroType } from '@/utils/types/criar_parametro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CriarRoboParametro({ roboId }: { roboId: string }) {
    const { register, handleSubmit } = useForm<CriarParametroType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarParametroSchema),
    });
    const tipos = Object.keys(criarParametroSchema.shape.tipo.Values);

    const { mutate: criarParametro, isSuccess, isError, error } = useCriarParametro({ roboId });

    const onSubmit = (data: CriarParametroType) => {
        criarParametro(data);
        if (isSuccess) {
            toast.success('Parâmetro criado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao criar parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };
    return (
        <form className='d-flex flex-column gap-2' onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div>
                <label htmlFor='nome_parametro' className='form-label'>
                    Nome
                </label>
                <input id='nome_parametro' type='text' className='form-control' {...register('nome')} />
            </div>
            <div>
                <label htmlFor='tipo' className='form-label'>
                    Tipo
                </label>
                <select id='robos' className='form-select' defaultValue='' {...register('tipo')}>
                    <option value=''>Selecione um tipo</option>
                    {tipos.map((tipo) => (
                        <option key={tipo} value={tipo}>
                            {tipo}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <button type='submit' className='btn btn-primary'>
                    Criar
                </button>
            </div>
        </form>
    );
}

export { CriarRoboParametro };
