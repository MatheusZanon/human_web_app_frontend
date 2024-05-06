import { useState } from 'react';
import { criarParametroSchema, CriarParametroType } from '@/utils/types/criar_parametro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Pencil } from 'lucide-react';
import { RoboParametros } from '@/utils/types/robo_parametros';
import { useAlterarParametro } from '@/api/http';

function AlterarRoboParametro({ roboId, parametro }: { roboId: string; parametro: RoboParametros }) {
    const [showAlterarParametroModal, setShowAlterarParametroModal] = useState(false);
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

    const { mutate: alterarParametro, isPending, isSuccess, isError, error } = useAlterarParametro({ roboId });

    const onSubmit = (parametroId: number, data: CriarParametroType) => {
        alterarParametro({ parametroId, data });
        if (isSuccess) {
            toast.success('Parâmetro alterado com sucesso!', {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }

        if (isError) {
            toast.error(`Erro ao alterar parâmetro! ${error?.response?.data}`, {
                autoClose: 3000,
                position: 'bottom-right',
            });
        }
    };

    return (
        <>
            <button className='btn py-0 px-2' type='button' onClick={() => setShowAlterarParametroModal(true)}>
                <Pencil size={18} />
            </button>
            <div className={`modal ${showAlterarParametroModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Alterar Parâmetro</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                onClick={() => setShowAlterarParametroModal(false)}
                            ></button>
                        </div>
                        <div className='modal-body'>
                            <form className='d-flex flex-column gap-2'>
                                <div>
                                    <label htmlFor='nome_parametro' className='form-label'>
                                        Nome
                                    </label>
                                    <input
                                        id='nome_parametro'
                                        type='text'
                                        defaultValue={parametro.parametro_info.nome}
                                        className='form-control'
                                        {...register('nome')}
                                    />
                                </div>
                                <div>
                                    <label htmlFor='tipo' className='form-label'>
                                        Tipo
                                    </label>
                                    <select
                                        id='robos'
                                        className='form-select'
                                        defaultValue={tipos.filter((tipo) => parametro.parametro_info.tipo === tipo)}
                                        {...register('tipo')}
                                    >
                                        {tipos.map((tipo) => (
                                            <option key={tipo} value={tipo}>
                                                {tipo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                onClick={handleSubmit((data) => onSubmit(parseInt(parametro.parametro_info.id), data))}
                                disabled={isPending}
                                aria-disabled={isPending}
                            >
                                Alterar
                            </button>
                            <button
                                type='button'
                                className='btn'
                                data-bs-dismiss='modal'
                                onClick={() => setShowAlterarParametroModal(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { AlterarRoboParametro };
