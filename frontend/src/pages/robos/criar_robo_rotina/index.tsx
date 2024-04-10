import { useCriarRotina } from '@/api/http';
import { CriarRotinaType, criarRotinaSchema } from '@/utils/types/criar_rotina';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CriarRoboRotina({ roboId }: { roboId: string }) {
    const { register, handleSubmit } = useForm<CriarRotinaType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarRotinaSchema),
    });

    const { mutate: criarRotina, isSuccess, isError, error } = useCriarRotina({ roboId });

    const onSubmit = (data: CriarRotinaType) => {
        criarRotina(data);
        if (isSuccess) {
            toast.success('Rotina criada com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao criar rotina! ${error?.response?.data}`, {
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
                <button type='submit' className='btn btn-primary'>
                    Criar
                </button>
            </div>
        </form>
    );
}

export { CriarRoboRotina };
