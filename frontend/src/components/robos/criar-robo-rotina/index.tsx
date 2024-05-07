import { useState } from 'react';
import { useCriarRotina } from '@/api/http/robos';
import { CriarRotinaType, criarRotinaSchema } from '@/utils/types/criar_rotina';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function CriarRoboRotinaModal({ roboId }: { roboId: string }) {
    const [showCreateRotinaModal, setShowCreateRotinaModal] = useState(false);

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

    const { mutate: criarRotina, isPending, isSuccess, isError, error } = useCriarRotina({ roboId });

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
        <>
            <button className='btn btn-secondary' onClick={() => setShowCreateRotinaModal(true)}>
                Criar Rotina
            </button>
            <div className={`modal ${showCreateRotinaModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h5 className='modal-title'>Criar Rotina</h5>
                            <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                                onClick={() => setShowCreateRotinaModal(false)}
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
                                onClick={() => setShowCreateRotinaModal(false)}
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

export { CriarRoboRotinaModal };
