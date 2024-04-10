import { useDeleteRobo } from '@/api/http';
import { Robo } from '@/utils/types/robo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

const deletarRoboSchema = z.object({
    id: z.string().min(1, 'Selecione um robô'),
});
type id = z.infer<typeof deletarRoboSchema>;
function DeletarRobo({ Robos }: { Robos: Robo[] }) {
    const { register, handleSubmit } = useForm<id>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldUnregister: false,
        shouldFocusError: true,
        shouldUseNativeValidation: false,
        delayError: 500,
        resolver: zodResolver(deletarRoboSchema),
    });

    const { mutate: deleteRobo, isSuccess } = useDeleteRobo();

    function onSubmit(data: id) {
        const id = parseInt(data.id);
        deleteRobo(id);
        if (isSuccess) {
            Robos.map((robo) => {
                if (robo.id === id) {
                    toast.success(`Robo ${robo.nome} deletado com sucesso`, {
                        autoClose: 3000,
                        position: 'bottom-right',
                    });
                }
            });
        }
    }

    return (
        <>
            <form className='d-flex flex-column gap-2' onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div>
                    <label className='form-label'>Robos</label>
                    <select id='robos' className='form-select' defaultValue='' {...register('id')}>
                        <option value=''>Selecione um robô</option>
                        {Robos.map((robo) => (
                            <option key={robo.id} value={robo.id}>
                                {robo.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type='submit' className='btn btn-danger'>
                        Deletar
                    </button>
                </div>
            </form>
        </>
    );
}

export { DeletarRobo };
