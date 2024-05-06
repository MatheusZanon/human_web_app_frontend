import { useState } from 'react';
import { useCriarParametro } from '@/api/http';
import { criarParametroSchema, CriarParametroType } from '@/utils/types/criar_parametro';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CriarRoboParametroModal({ roboId }: { roboId: string }) {
    const [showCreateParametroModal, setShowCreateParametroModal] = useState(false);
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

    const { mutate: criarParametro, isPending, isSuccess, isError, error } = useCriarParametro({ roboId });

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
        <>
            <button className='btn btn-primary' onClick={() => setShowCreateParametroModal(true)}>
                Criar Parâmetro
            </button>
            <div className={`modal ${showCreateParametroModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>{'Criar Parâmetro'}</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                onClick={() => setShowCreateParametroModal(false)}
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
                                        className='form-control'
                                        {...register('nome')}
                                    />
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
                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button
                                type='submit'
                                className='btn btn-primary'
                                onClick={handleSubmit((data) => onSubmit(data))}
                                disabled={isPending}
                                aria-disabled={isPending}
                            >
                                Criar
                            </button>
                            <button
                                type='button'
                                className='btn'
                                data-bs-dismiss='modal'
                                onClick={() => setShowCreateParametroModal(false)}
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

export { CriarRoboParametroModal };
