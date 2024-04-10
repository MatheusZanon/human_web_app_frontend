import { useCreateRobo } from '@/api/http';
import { CriarRoboType } from '@/utils/types/criar_robo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const criarRoboSchema = z.object({
    nome: z.string().min(1, 'Este campo é obrigatório'),
    categoria: z.string().min(1, 'Este campo é obrigatório'),
    descricao: z.string().min(1, 'Este campo é obrigatório'),
});
function CriarRobo() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CriarRoboType>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(criarRoboSchema),
    });

    const { mutate: create, isSuccess } = useCreateRobo();

    function onSubmit(data: CriarRoboType) {
        create(data);
        if (isSuccess) {
            toast.success('Robo criado com sucesso', {
                autoClose: 3000,
                position: 'bottom-right',
            });
            reset({
                nome: '',
                categoria: '',
                descricao: '',
            });
        }
    }
    return (
        <>
            <form className='d-flex flex-column gap-2' onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div>
                    <label htmlFor='nome_robo' className='form-label'>
                        Nome
                    </label>
                    <input id='nome_robo' type='text' className='form-control' {...register('nome')} />
                    {errors.nome && <small className='text-danger'>{errors.nome?.message as string}</small>}
                </div>
                <div>
                    <label htmlFor='categoria_robo' className='form-label'>
                        Categoria
                    </label>
                    <input id='categoria_robo' type='text' className='form-control' {...register('categoria')} />
                    {errors.categoria && <small className='text-danger'>{errors.categoria?.message as string}</small>}
                </div>
                <div>
                    <label htmlFor='descricao_robo' className='form-label'>
                        Descrição
                    </label>
                    <input id='descricao_robo' type='text' className='form-control' {...register('descricao')} />
                    {errors.descricao && <small className='text-danger'>{errors.descricao?.message as string}</small>}
                </div>
                <div>
                    <button className='btn btn-primary' type='submit'>
                        Criar
                    </button>
                </div>
            </form>
        </>
    );
}

export { CriarRobo, criarRoboSchema };
